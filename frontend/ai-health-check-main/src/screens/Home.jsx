// src/screens/Home.jsx
import React from 'react';
import Screen from '../components/Screen';
import ProfileHeader from '../components/ProfileHeader';
import Calendar from '../components/Calendar';
import SuggestionCard from '../components/SuggestionCard';
import { PrimaryButton } from '../components/Button';

const Home = ({ activeScreen, goToScreen, userData }) => {
    const bmi = (userData.weight / Math.pow(userData.height / 100, 2)).toFixed(1);

    const generateHomeSuggestions = () => {
        const suggestions = [];

        if (bmi < 18.5) {
            suggestions.push({
                icon: '🍽️',
                title: 'Weight Management',
                text: 'Your BMI suggests underweight. Focus on calorie-dense, nutritious foods.'
            });
        } else if (bmi >= 25) {
            suggestions.push({
                icon: '🥗',
                title: 'Healthy Eating',
                text: 'Consider a balanced diet with more vegetables and lean proteins.'
            });
        } else {
            suggestions.push({
                icon: '💪',
                title: 'Stay Strong',
                text: 'Your BMI is healthy! Maintain with regular exercise and balanced diet.'
            });
        }

        suggestions.push({
            icon: '💧',
            title: 'Hydration Goal',
            text: 'Drink 8-10 glasses of water today for optimal health.'
        });

        suggestions.push({
            icon: '🏃',
            title: 'Activity Target',
            text: 'Complete 30 minutes of physical activity today.'
        });
        return suggestions;
    };

    return (
        <Screen screenId={1} activeScreen={activeScreen}>
            <h1>Hey <span>{userData.name}</span>,</h1>

            <ProfileHeader userData={userData} />

            <Calendar />

            <h2 style={{ fontSize: '20px' }}>📋 Today's Recommendations</h2>
            <div id="homeSuggestions">
                {generateHomeSuggestions().map((s, index) => (
                    <SuggestionCard key={index} {...s} />
                ))}
            </div>

            <PrimaryButton onClick={() => goToScreen(2)}>Start Today's Check-in</PrimaryButton>
        </Screen>
    );
};

export default Home;