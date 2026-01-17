// src/screens/Comparison.jsx
import React from 'react';
import Screen from '../components/Screen';
import { PrimaryButton, HamburgerButton } from '../components/Button';
import ChartCard from '../components/ChartCard';
import ComparisonSection from '../components/Comparison';
import { createComparisonChart } from '../utils/chartUtils';
import { generateWeeklyScoreTrend } from '../utils/helpers';

const Comparison = ({ activeScreen, goToScreen, healthMetrics, dailyInput }) => {
    const weeklyScores = generateWeeklyScoreTrend(healthMetrics.score);
    const avgActivity = dailyInput.activity; 
    const avgWater = dailyInput.water; 

    return (
        <Screen screenId={6} activeScreen={activeScreen}>
            <HamburgerButton onClick={() => goToScreen(1)} />
            <h1>Weekly<br />Comparison</h1>

            <ChartCard
                title="7-Day Health Trend"
                chartCreator={createComparisonChart}
                chartData={[weeklyScores]}
                style={{ background: 'white', marginBlockStart: '20px', marginBlockEnd: '20px' }}
            />

            <ComparisonSection
                currentScore={healthMetrics.score}
                avgActivity={avgActivity}
                avgWater={avgWater}
            />

            <PrimaryButton onClick={() => goToScreen(1)}>Back to Home</PrimaryButton>
        </Screen>
    );
};

export default Comparison;