// src/App.jsx
import React, { useState } from 'react';
import StatusBar from './components/StatusBar.jsx';
import NavDots from './components/NavDots.jsx';
import Screen from './components/Screen.jsx';
import { PrimaryButton, SecondaryButton } from './components/Button.jsx';
import { initialUserData, calculateHealthMetrics } from './services/healthLogic.js';
import { destroyCharts } from './utils/chartUtils.js';

// Screen Imports
import Home from './screens/Home.jsx';
import DailyInput from './screens/DailyInput.jsx';
import PostureScan from './screens/PostureScan.jsx';
import Results from './screens/Results.jsx';
import DetailedAnalysis from './screens/DetailedAnalysis.jsx';
import Comparison from './screens/Comparison.jsx';
import Login from './screens/Login.jsx';
import Signup from './screens/Signup.jsx';

// Default initial state for a new session
const initialDailyInput = {
    mood: 3,
    sleep: 0,
    activity: 0,
    water: 0,
    screenTime: 0,
    postureScore: 82,
};

function App() {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [userData, setUserData] = useState(initialUserData);
    const [dailyInput, setDailyInput] = useState(initialDailyInput);
    const [healthMetrics, setHealthMetrics] = useState(calculateHealthMetrics(initialUserData));

    const goToScreen = (num) => {
        // When navigating away from results/analysis, destroy charts
        if ([4, 5, 6].includes(currentScreen) && num !== 5 && num !== 6) {
            destroyCharts();
        }
        setCurrentScreen(num);
    };

    const handleSignup = (newUserData) => {
        setUserData(newUserData);
        setHealthMetrics(calculateHealthMetrics(newUserData)); // Re-calculate with new body data
        goToScreen(1);
    };

    const handleCalculateResults = () => {
        const metrics = calculateHealthMetrics({ ...userData, ...dailyInput });
        setHealthMetrics(metrics);
        goToScreen(4); // Go to Results screen

        // Reset daily inputs after calculating results
        setDailyInput(initialDailyInput);
    };

    return (
        <div className="phone-container">
            <StatusBar />

            {/* Screen 0: Welcome */}
            <Screen screenId={0} activeScreen={currentScreen}>
                <div className="logo">🏥</div>
                <h1 style={{ textAlign: 'center' }}>AI Health Check</h1>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '60px' }}>Your personal health companion</p>
                <h2 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '40px' }}>Welcome!</h2>
                <PrimaryButton onClick={() => goToScreen(7)}>🔐 Login</PrimaryButton>
                <SecondaryButton onClick={() => goToScreen(8)}>✨ Sign Up</SecondaryButton>
            </Screen>

            {/* Screen 7 & 8: Auth */}
            <Login
                activeScreen={currentScreen}
                goToScreen={goToScreen}
                onLoginSuccess={() => goToScreen(1)}
            />
            <Signup
                activeScreen={currentScreen}
                goToScreen={goToScreen}
                onSignup={handleSignup}
            />

            {/* Screen 1: Home */}
            <Home
                activeScreen={currentScreen}
                goToScreen={goToScreen}
                userData={userData}
            />

            {/* Screen 2: Daily Input */}
            <DailyInput
                activeScreen={currentScreen}
                goToScreen={goToScreen}
                dailyInput={dailyInput}
                setDailyInput={setDailyInput}
            />

            {/* Screen 3: Posture Scan */}
            <PostureScan
                activeScreen={currentScreen}
                goToScreen={goToScreen}
                dailyInput={dailyInput}
                setDailyInput={setDailyInput}
                onCalculateResults={handleCalculateResults}
            />

            {/* Screen 4: Results */}
            <Results
                activeScreen={currentScreen}
                goToScreen={goToScreen}
                healthMetrics={healthMetrics}
            />

            {/* Screen 5: Detailed Analysis */}
            <DetailedAnalysis
                activeScreen={currentScreen}
                goToScreen={goToScreen}
                userData={userData}
                dailyInput={dailyInput}
                healthMetrics={healthMetrics}
            />

            {/* Screen 6: Comparison */}
            <Comparison
                activeScreen={currentScreen}
                goToScreen={goToScreen}
                healthMetrics={healthMetrics}
                dailyInput={dailyInput}
            />

            <NavDots currentScreen={currentScreen} goToScreen={goToScreen} />
        </div>
    );
}

export default App;