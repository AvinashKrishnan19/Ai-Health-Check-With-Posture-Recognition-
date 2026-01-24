// src/services/api.js
const API_BASE_URL = "https://ai-health-check-with-posture-recognition.onrender.com";

export async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
}

export async function signup(userData) {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Signup failed");
    return response.json();
}

export async function getHistory(userId) {
    const response = await fetch(`${API_BASE_URL}/history/${userId}`);
    if (!response.ok) throw new Error("History fetch failed");
    return response.json();
}

export async function getPrediction(data, userId) {
    const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: userId,
            sleep: data.sleep,
            activity: data.activity,
            water: data.water,
            screen: data.screenTime,
            mood: data.mood,
            bmi: parseFloat(data.weight / Math.pow(data.height / 100, 2)).toFixed(1),
            posture_score: data.postureScore
        }),
    });
    if (!response.ok) throw new Error("Prediction failed");
    return response.json();
}
