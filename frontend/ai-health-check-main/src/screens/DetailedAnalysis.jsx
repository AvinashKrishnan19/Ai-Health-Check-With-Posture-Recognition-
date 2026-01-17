// src/screens/DetailedAnalysis.jsx
import React from 'react';
import Screen from '../components/Screen';
import ProfileHeader from '../components/ProfileHeader';
import { PrimaryButton, HamburgerButton } from '../components/Button';
import { generateRecommendations } from '../services/healthLogic';

const riskColors = {
    Low: '#27ae60', Moderate: '#f39c12', High: '#e74c3c', 'Very High': '#c0392b', Underweight: '#3498db'
};

const DetailedAnalysis = ({ activeScreen, goToScreen, userData, dailyInput, healthMetrics }) => {
    const { score, bmi, riskLabels } = healthMetrics;
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (score / 100 * circumference);

    // Dynamic stroke color for progress circle
    let strokeColor = '#2463eb';
    if (score >= 60) strokeColor = '#27ae60';
    else if (score >= 40) strokeColor = '#f39c12';
    else strokeColor = '#e74c3c';

    const suggestions = generateRecommendations(dailyInput, healthMetrics);

    return (
        <Screen screenId={5} activeScreen={activeScreen}>
            <HamburgerButton onClick={() => goToScreen(1)} />
            <h1>Detailed Analysis</h1>

            <ProfileHeader userData={userData} detailed={true} />

            <div style={{ padding: '20px 0' }}>
                <div className="score-circle">
                    <svg width="200" height="200">
                        <circle className="score-bg" cx="100" cy="100" r="90" />
                        <circle
                            className="score-progress"
                            cx="100" cy="100" r="90"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ stroke: strokeColor }}
                        />
                    </svg>
                    <div className="score-text">{score}</div>
                </div>
                <div style={{ textAlign: 'center', fontSize: '18px', color: '#2463eb', fontWeight: 600 }}>Overall Health Score</div>
            </div>

            <div className="info-card">
                <h3 style={{ marginBottom: '12px', color: '#1a1a1a' }}>Health Metrics</h3>
                <div className="info-row">
                    <span>BMI</span>
                    <strong style={{ color: '#2463eb' }}>{bmi}</strong>
                </div>
                <div className="info-row">
                    <span>Obesity Risk</span>
                    <strong style={{ color: riskColors[riskLabels.obesityLabel] }}>{riskLabels.obesityLabel}</strong>
                </div>
                <div className="info-row">
                    <span>Cardiovascular Risk</span>
                    <strong style={{ color: riskColors[riskLabels.cardioLabel] }}>{riskLabels.cardioLabel}</strong>
                </div>
                <div className="info-row">
                    <span>Hypertension Risk</span>
                    <strong style={{ color: riskColors[riskLabels.hyperLabel] }}>{riskLabels.hyperLabel}</strong>
                </div>
                <div className="info-row">
                    <span>Posture Score</span>
                    <strong style={{ color: '#2463eb' }}>{dailyInput.postureScore}/100</strong>
                </div>
            </div>

            <div className="info-card"
                style={{ background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))' }}>
                <h3 style={{ marginBottom: '12px', color: '#1a1a1a' }}>📝 Personalized Recommendations</h3>
                <div id="detailedSuggestions">
                    {suggestions.map((s, index) => (
                        <p key={index} style={{ margin: '8px 0', lineHeight: 1.6, fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: s }} />
                    ))}
                </div>
            </div>

            <PrimaryButton onClick={() => goToScreen(6)}>View Comparison</PrimaryButton>
        </Screen>
    );
};

export default DetailedAnalysis;