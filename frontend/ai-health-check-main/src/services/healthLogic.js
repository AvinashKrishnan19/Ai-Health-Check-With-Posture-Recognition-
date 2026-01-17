// src/services/healthLogic.js

// Initial user data structure
export const initialUserData = {
    name: 'User',
    age: 25,
    gender: 'female',
    weight: 60, // kg
    height: 165, // cm
    waist: 70, // cm
    hip: 95, // cm
    mood: 3, // 1=best, 5=worst
    sleep: 0, // hours
    activity: 0, // minutes
    water: 0, // glasses
    screenTime: 0, // hours
    postureScore: 82, // 100 max
};

/**
 * Calculates the overall health score and risk factors based on user data.
 * @param {object} data - The user's input data for the day.
 * @returns {object} - An object containing the score, health status, risks, and display values.
 */
export function calculateHealthMetrics(data) {
    let score = 0;

    // --- 1. Calculate Score (Max 100 points) ---
    // Sleep (Max 25 points)
    if (data.sleep >= 7 && data.sleep <= 9) score += 25;
    else if (data.sleep >= 6 && data.sleep <= 10) score += 20;
    else if (data.sleep >= 4) score += 10;

    // Water (Max 15 points)
    if (data.water >= 8) score += 15;
    else if (data.water >= 6) score += 12;
    else if (data.water >= 4) score += 6;
    else if (data.water >= 2) score += 3;

    // Activity (Max 20 points)
    if (data.activity >= 60) score += 20;
    else if (data.activity >= 45) score += 17;
    else if (data.activity >= 30) score += 15;
    else if (data.activity >= 15) score += 8;
    else if (data.activity >= 5) score += 4;

    // Screen time (Max 10 points - inverse)
    if (data.screenTime <= 2) score += 10;
    else if (data.screenTime <= 4) score += 8;
    else if (data.screenTime <= 6) score += 5;
    else if (data.screenTime <= 10) score += 2;

    // Mood (Max 15 points - inverse)
    if (data.mood === 1) score += 15;
    else if (data.mood === 2) score += 12;
    else if (data.mood === 3) score += 9;
    else if (data.mood === 4) score += 5;
    else score += 2;

    // Posture (Max 15 points)
    if (data.postureScore >= 85) score += 15;
    else if (data.postureScore >= 70) score += 12;
    else if (data.postureScore >= 60) score += 8;
    else if (data.postureScore >= 50) score += 5;
    else score += 2;

    const finalScore = Math.min(100, Math.max(0, Math.round(score)));

    // --- 2. Health Status ---
    let healthStatus, statusColor, statusEmoji;
    if (finalScore >= 80) {
        healthStatus = 'Excellent Health';
        statusColor = '#27ae60';
        statusEmoji = '💪';
    } else if (finalScore >= 60) {
        healthStatus = 'Good Health';
        statusColor = '#2ecc71';
        statusEmoji = '👍';
    } else if (finalScore >= 40) {
        healthStatus = 'Fair Health - Needs Improvement';
        statusColor = '#f39c12';
        statusEmoji = '⚠️';
    } else if (finalScore >= 20) {
        healthStatus = 'Poor Health - Action Required';
        statusColor = '#e67e22';
        statusEmoji = '⚠️';
    } else {
        healthStatus = 'Critical - Immediate Action Needed';
        statusColor = '#e74c3c';
        statusEmoji = '🚨';
    }

    // --- 3. Calculate BMI and Risks ---
    const bmi = (data.weight / Math.pow(data.height / 100, 2)).toFixed(1);

    let obesityRisk, obesityLabel;
    if (parseFloat(bmi) < 18.5) {
        obesityRisk = 30; obesityLabel = 'Underweight';
    } else if (parseFloat(bmi) < 25) {
        obesityRisk = 10; obesityLabel = 'Low';
    } else if (parseFloat(bmi) < 30) {
        obesityRisk = 55; obesityLabel = 'Moderate';
    } else if (parseFloat(bmi) < 35) {
        obesityRisk = 75; obesityLabel = 'High';
    } else {
        obesityRisk = 90; obesityLabel = 'Very High';
    }

    // Cardiovascular risk
    let cardioRiskScore = 0;
    if (data.activity < 15) cardioRiskScore += 30;
    else if (data.activity < 30) cardioRiskScore += 20;
    else if (data.activity < 45) cardioRiskScore += 10;

    if (parseFloat(bmi) >= 30) cardioRiskScore += 30;
    else if (parseFloat(bmi) >= 25) cardioRiskScore += 15;

    if (data.water < 4) cardioRiskScore += 15;
    else if (data.water < 6) cardioRiskScore += 8;

    const cardiovascularRisk = Math.min(95, cardioRiskScore + 10);
    let cardioLabel;
    if (cardiovascularRisk < 30) {
        cardioLabel = 'Low';
    } else if (cardiovascularRisk < 60) {
        cardioLabel = 'Moderate';
    } else {
        cardioLabel = 'High';
    }

    // Hypertension risk
    let hyperRiskScore = 0;
    if (data.mood >= 4) hyperRiskScore += 25;
    else if (data.mood >= 3) hyperRiskScore += 12;

    if (data.screenTime > 8) hyperRiskScore += 20;
    else if (data.screenTime > 6) hyperRiskScore += 15;
    else if (data.screenTime > 4) hyperRiskScore += 8;

    if (data.sleep < 5) hyperRiskScore += 20;
    else if (data.sleep < 7) hyperRiskScore += 10;

    if (data.activity < 20) hyperRiskScore += 15;

    const hypertensionRisk = Math.min(95, hyperRiskScore + 5);
    let hyperLabel;
    if (hypertensionRisk < 30) {
        hyperLabel = 'Low';
    } else if (hypertensionRisk < 60) {
        hyperLabel = 'Moderate';
    } else {
        hyperLabel = 'High';
    }

    return {
        score: finalScore,
        bmi: bmi,
        healthStatus,
        statusColor,
        statusEmoji,
        riskMetrics: {
            obesityRisk,
            cardiovascularRisk,
            hypertensionRisk,
        },
        riskLabels: {
            obesityLabel,
            cardioLabel,
            hyperLabel,
        },
    };
}

/**
 * Generates personalized health recommendations.
 * @param {object} data - The user's input data.
 * @param {object} metrics - The calculated health metrics.
 * @returns {string[]} - An array of recommendation strings.
 */
export function generateRecommendations(data, metrics) {
    const { bmi, postureScore, riskLabels } = metrics;
    const { activity, water, screenTime, sleep, mood } = data;
    const suggestions = [];

    // BMI-based suggestions
    if (parseFloat(bmi) >= 25) {
        suggestions.push('🍎 <strong>Weight Management:</strong> Your BMI indicates overweight. Consider a balanced diet with a calorie deficit of 300-500 kcal/day combined with regular exercise.');
    } else if (parseFloat(bmi) < 18.5) {
        suggestions.push('🍽️ <strong>Healthy Weight Gain:</strong> Your BMI suggests underweight. Add 300-500 calories daily through nutrient-dense foods like nuts, avocados, and whole grains.');
    } else {
        suggestions.push('✅ <strong>Maintain Healthy Weight:</strong> Your BMI is in the healthy range. Continue your balanced diet and regular physical activity.');
    }

    // Activity suggestions
    if (activity < 30) {
        suggestions.push('🏃 <strong>Increase Physical Activity:</strong> Start with 15 minutes of brisk walking daily and gradually increase to 30 minutes. This helps improve cardiovascular health.');
    } else if (activity < 60) {
        suggestions.push('💪 <strong>Boost Your Activity:</strong> You\'re doing well! Try to reach 45-60 minutes of exercise for optimal health benefits.');
    }

    // Hydration suggestions
    if (water < 8) {
        suggestions.push('💧 <strong>Hydration Alert:</strong> Set hourly reminders to drink water. Aim for at least 8 glasses (2 liters) daily to support metabolism and overall health.');
    }

    // Screen time suggestions
    if (screenTime > 6) {
        suggestions.push('📱 <strong>Reduce Screen Time:</strong> High screen time affects sleep and posture. Follow the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds.');
    }

    // Sleep suggestions
    if (sleep < 7) {
        suggestions.push('😴 <strong>Improve Sleep:</strong> Aim for 7-9 hours of quality sleep. Create a bedtime routine and avoid screens 1 hour before sleep.');
    }

    // Mood/stress suggestions
    if (mood >= 4) {
        suggestions.push('🧘 <strong>Stress Management:</strong> Practice daily meditation, deep breathing, or yoga for 10-15 minutes to reduce stress levels.');
    }

    // Posture suggestions
    if (postureScore < 70) {
        suggestions.push('🪑 <strong>Posture Improvement:</strong> Adjust your workspace ergonomically. Do shoulder rolls and neck stretches every hour when sitting.');
    }

    // Risk-specific suggestions
    if (riskLabels.cardioLabel === 'High' || riskLabels.hyperLabel === 'High') {
        suggestions.push('❤️ <strong>Heart Health Priority:</strong> Include cardio exercises 3-4 times per week and consider consulting a healthcare provider for blood pressure monitoring.');
    }

    return suggestions;
}