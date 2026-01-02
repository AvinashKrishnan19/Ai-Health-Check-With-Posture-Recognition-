import os
import numpy as np
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import pymysql
from db import get_connection

app = Flask(__name__)
CORS(app)

# Absolute paths for model and scaler
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "health_model.pkl")
scaler_path = os.path.join(base_dir, "scaler.pkl")

try:
    with open(model_path, "rb") as f:
        model = pickle.load(f)
    with open(scaler_path, "rb") as f:
        scaler = pickle.load(f)
    print("Model and Scaler loaded successfully.")
except Exception as e:
    print(f"Error loading model/scaler: {e}")
    model = None
    scaler = None

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    hashed_password = generate_password_hash(password)

    conn = get_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO user (username, email, password_hash) VALUES (%s, %s, %s)", 
                    (username, email, hashed_password))
        conn.commit()
        user_id = cur.lastrowid
        conn.close()
        return jsonify({"message": "User created", "user_id": user_id, "username": username, "email": email}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = get_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("SELECT * FROM user WHERE email = %s", (email,))
        user = cur.fetchone()
        conn.close()

        if user:
            # Try password_hash first (used by check_password_hash)
            stored_pwd = user.get("password_hash") or user.get("password")
            if stored_pwd and (check_password_hash(stored_pwd, password) or stored_pwd == password):
                return jsonify({
                    "user_id": user["id"],
                    "username": user["username"],
                    "email": user["email"]
                })
        
        return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/history/<int:user_id>", methods=["GET"])
def history(user_id):
    conn = get_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    
    try:
        cur = conn.cursor(pymysql.cursors.DictCursor)
        # Using the user's requested JOIN query format
        query = """
            SELECT 
                u.username,
                u.email,
                d.bmi,
                d.screen,
                d.water,
                d.activity,
                d.mood,
                d.sleep,
                d.posture_score,
                d.cardio,
                d.obesity,
                d.hypertension,
                d.created_at
            FROM user_data d
            JOIN user u ON u.id = d.user_id
            WHERE d.user_id = %s
            ORDER BY d.created_at DESC
        """
        cur.execute(query, (user_id,))
        records = cur.fetchall()
        
        # Convert datetime objects to string for JSON serialization
        for r in records:
            if r['created_at']:
                r['created_at'] = r['created_at'].strftime("%Y-%m-%d %H:%M:%S")
                
        conn.close()
        return jsonify(records)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/predict", methods=["POST"])
def predict():
    if model is None or scaler is None:
        return jsonify({"error": "Model or scaler not loaded"}), 500

    data = request.json
    user_id = data.get("user_id")
    
    try:
        # Cast to proper types for model and DB
        sleep = float(data.get("sleep", 0))
        activity = float(data.get("activity", 0))
        water = float(data.get("water", 0))
        screen = float(data.get("screen", 0))
        mood = int(data.get("mood", 3))
        bmi = float(data.get("bmi", 22.0))
        raw_posture = float(data.get("posture_score", 0))
        
        # Scale posture score if it's on 0-100 scale (training was 0-10)
        posture_score = raw_posture
        if posture_score > 10:
            posture_score = posture_score / 10.0

        features = np.array([[
            sleep,
            activity,
            water,
            screen,
            mood,
            bmi,
            posture_score
        ]])

        features_scaled = scaler.transform(features)
        preds = model.predict(features_scaled)[0]

        # Convert predictions to int (1 for High/True, 0 for Low/False)
        obesity_int = 1 if preds[0] else 0
        cardio_int = 1 if preds[1] else 0
        hyper_int = 1 if preds[2] else 0

        result = {
            "obesity": "High" if obesity_int else "Low",
            "cardio": "High" if cardio_int else "Low",
            "hypertension": "High" if hyper_int else "Low"
        }

        # Save to MySQL user_data table
        if user_id:
            conn = get_connection()
            if conn:
                try:
                    cur = conn.cursor()
                    cur.execute("""
                        INSERT INTO user_data 
                        (user_id, bmi, screen, water, activity, mood, sleep, posture_score, 
                         obesity, cardio, hypertension) 
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (
                        user_id, bmi, screen, water, activity, mood, sleep, raw_posture,
                        obesity_int, cardio_int, hyper_int
                    ))
                    conn.commit()
                    conn.close()
                    print(f"Data saved successfully for user {user_id}")
                except Exception as e:
                    print(f"Failed to insert record: {e}")
        else:
            print("No user_id provided, skipping database save.")
        
        return jsonify(result)

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
