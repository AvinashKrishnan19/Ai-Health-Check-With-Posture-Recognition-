// src/screens/Results.jsx
import React, { useEffect, useRef } from 'react';
import Screen from '../components/Screen';
import { PrimaryButton, HamburgerButton } from '../components/Button';
import ChartCard from '../components/ChartCard';
import { createPieChart } from '../utils/chartUtils';

const Results = ({ activeScreen, goToScreen, healthMetrics }) => {
    const { score, healthStatus, statusColor, statusEmoji, riskMetrics } = healthMetrics;
    const progressCircleRef = useRef(null);

    useEffect(() => {
        const circumference = 2 * Math.PI * 90;
        const offset = circumference - (score / 100 * circumference);
        const progressCircle = progressCircleRef.current;

        if (progressCircle) {
            progressCircle.style.strokeDashoffset = offset;
            
            // Update circle color based on score (simplified for the card)
            let circleColor = '#2463eb';
            if (score >= 60) circleColor = '#27ae60'; 
            else if (score >= 40) circleColor = '#f39c12';
            else circleColor = '#e74c3c';
            progressCircle.style.stroke = circleColor;
        }
    }, [score]);


    return (
        <Screen screenId={4} activeScreen={activeScreen}>
            <HamburgerButton onClick={() => goToScreen(1)} />
            <h1>Analysis</h1>

            <div className="improvement-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="improvement-score">{score}</span>
                    {/* Simplified Chart Mini SVG - Retained for visual */}
                    <svg className="chart-mini" viewBox="0 0 100 50">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.5)' }} />
                                <stop offset="100%" style={{ stopColor: 'white' }} />
                            </linearGradient>
                        </defs>
                        <polyline points="0,35 15,30 25,33 40,25 55,20 70,23 85,12 100,8" fill="none"
                            stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="100" cy="8" r="4" fill="white" />
                    </svg>
                </div>
                <div style={{ fontSize: '15px', opacity: 0.9, marginBlockStart: '8px' }}>Overall Health Score</div>
                <div style={{ fontSize: '18px', fontWeight: 600, marginBlockStart: '8px', color: statusColor }}>
                    {statusEmoji} {healthStatus}
                </div>
            </div>

            <ChartCard
                title="Risk Assessment"
                chartCreator={createPieChart}
                chartData={[
                    riskMetrics.obesityRisk,
                    riskMetrics.cardiovascularRisk,
                    riskMetrics.hypertensionRisk,
                ]}
                style={{ background: 'white' }}
            />

            <PrimaryButton onClick={() => goToScreen(5)}>View Detailed Analysis</PrimaryButton>
        </Screen>
    );
};

export default Results;