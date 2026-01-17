// src/services/api.js
const API_BASE_URL = 'http://127.0.0.1:5000';

export async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Login failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function signup(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Signup failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
}

export async function getHistory(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/history/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch history');
        }
        return await response.json();
    } catch (error) {
        console.error('History error:', error);
        throw error;
    }
}

export async function getPrediction(data, userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                sleep: data.sleep,
                activity: data.activity,
                water: data.water,
                screen: data.screenTime, // Backend expects 'screen'
                mood: data.mood,
                bmi: parseFloat(data.weight / Math.pow(data.height / 100, 2)).toFixed(1),
                posture_score: data.postureScore
            }),
        });

        if (!response.ok) {
            throw new Error('Backend prediction failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching prediction:', error);
        return null;
    }
}
