# AI Health Project - Execution Guide

This guide will walk you through setting up and running the AI Health Check project.

## Prerequisites
1. **Python 3.x** installed.
2. **Node.js** and **npm** installed.
3. **MySQL Server** installed and running.

---

## Step 1: Database Setup
1. Open your MySQL client (like MySQL Workbench or Terminal).
2. Create the database and tables using the schema you provided:
   ```sql
   CREATE DATABASE ai_health;
   USE ai_health;

   CREATE TABLE user (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL,
       password VARCHAR(512) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE user_data (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       bmi FLOAT,
       screen INT,
       water INT,
       activity INT,
       mood INT,
       sleep INT,
       posture_score INT,
       cardio INT,
       obesity INT,
       hypertension INT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
   );
   ```
3. Update the password in `Backend/db.py` if it's different from `"PASSWORD"`.

---

## Step 2: Backend Setup
1. Open a terminal in the `final_AIHealth/Backend` directory.
2. Install dependencies:
   ```bash
   pip install -r requirement.txt
   ```
3. **Start the Flask Server**:
   ```bash
   python app.py
   ```
   *The server will run on `http://127.0.0.1:5000`.*

---

## Step 3: Frontend Setup
1. Open another terminal in the `final_AIHealth/frontend/ai-health-check-main` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. **Start the React App**:
   ```bash
   npm start
   ```
   *The app will open in your browser (usually at `http://localhost:5173` for Vite).*

---

## Step 4: Using the App
1. **Sign Up**: Since the database is fresh, you need to create a new account first. Use the "Sign Up" button.
2. **Login**: Use the email and password you just registered.
3. **Health Check-in**:
   - Go through the sliders (Sleep, Activity, etc.).
   - Perform the **Posture Scan** (allow camera access).
   - Click "Get Results".
4. **Check Database**:
   - After the results screen appears, your data is saved!
   - Run `SELECT * FROM user_data;` in MySQL to see your record.
   - Or visit `http://127.0.0.1:5000/history/1` to see the JSON data.
