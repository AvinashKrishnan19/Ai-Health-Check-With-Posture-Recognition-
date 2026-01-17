// src/App.jsx
import React, { useState } from 'react';
import StatusBar from './components/StatusBar';
import NavDots from './components/NavDots';
import Screen from './components/Screen';
import { PrimaryButton, SecondaryButton } from './components/Button';
import { initialUserData, calculateHealthMetrics } from './services/healthLogic';
import { getPrediction } from './services/api';
import { destroyCharts } from './utils/chartUtils';

// Screen Imports
import Home from './screens/Home';
import DailyInput from './screens/DailyInput';
import PostureScan from './screens/PostureScan';
import Results from './screens/Results';
import DetailedAnalysis from './screens/DetailedAnalysis';
import Comparison from './screens/Comparison';
import Login from './screens/Login';
import Signup from './screens/Signup';

// Default initial state for a new session
const initialDailyInput = {
    mood: 3,
    sleep: 7,
    activity: 30,
    water: 8,
    screenTime: 4,
    postureScore: 82,
};

function App() {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(initialUserData);
    const [dailyInput, setDailyInput] = useState(initialDailyInput);
    const [healthMetrics, setHealthMetrics] = useState(calculateHealthMetrics(initialUserData));

    const goToScreen = (num) => {
        // When navigating away from results/analysis, destroy charts
        if ([4, 5, 6].includes(currentScreen) && num !== 5 && num !== 6) {
            destroyCharts();
        }

        // Reset daily inputs when starting a fresh check-in from Home
        if (currentScreen === 1 && num === 2) {
            setDailyInput(initialDailyInput);
        }

        setCurrentScreen(num);
    };

    const handleSignup = (newUserData) => {
        setUserData(newUserData);
        // Track the user info from backend (api.signup will be called in Signup screen)
        setCurrentUser({
            user_id: newUserData.user_id,
            username: newUserData.username,
            email: newUserData.email
        });
        setHealthMetrics(calculateHealthMetrics(newUserData)); // Re-calculate with new body data
        goToScreen(1);
    };

    const handleLogin = (user) => {
        setCurrentUser(user);
        // Pre-fill userData generic fields if needed, but for now we just track identity
        setUserData(prev => ({ ...prev, name: user.username }));
        goToScreen(1);
    };

    const handleCalculateResults = async () => {
        const fullData = { ...userData, ...dailyInput };
        let metrics = calculateHealthMetrics(fullData);

        // Try to get prediction from backend
        const prediction = await getPrediction(fullData, currentUser?.user_id);
        if (prediction) {
            // Update metrics with backend predictions
            metrics.riskLabels.obesityLabel = prediction.obesity;
            metrics.riskLabels.cardioLabel = prediction.cardio;
            metrics.riskLabels.hyperLabel = prediction.hypertension;

            // Map "High"/"Low" to numeric risks for charts
            metrics.riskMetrics.obesityRisk = prediction.obesity === 'High' ? 80 : 20;
            metrics.riskMetrics.cardiovascularRisk = prediction.cardio === 'High' ? 80 : 20;
            metrics.riskMetrics.hypertensionRisk = prediction.hypertension === 'High' ? 80 : 20;
        }

        setHealthMetrics(metrics);
        goToScreen(4); // Go to Results screen
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
                onLoginSuccess={handleLogin}
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