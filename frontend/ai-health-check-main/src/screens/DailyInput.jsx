// src/screens/DailyInput.jsx
import React from 'react';
import Screen from '../components/Screen';
import MoodSelector from '../components/MoodSelector';
import InputSlider from '../components/InputSlider';
import { PrimaryButton } from '../components/Button';

const DailyInput = ({ activeScreen, goToScreen, dailyInput, setDailyInput }) => {
    const updateInput = (key, value) => {
        setDailyInput(prev => ({ ...prev, [key]: value }));
    };

    return (
        <Screen screenId={2} activeScreen={activeScreen}>
            <h1>How are you<br />feeling today?</h1>
            <MoodSelector
                selectedMood={dailyInput.mood}
                onSelect={(level) => updateInput('mood', level)}
            />
            <InputSlider
                label="Sleep hours"
                min={0} max={12} step={0.5}
                value={dailyInput.sleep}
                onChange={(val) => updateInput('sleep', val)}
            />
            <InputSlider
                label="Activity"
                min={0} max={120} step={1}
                value={dailyInput.activity}
                onChange={(val) => updateInput('activity', val)}
                unit=" min"
            />
            <InputSlider
                label="Water"
                min={0} max={16} step={1}
                value={dailyInput.water}
                onChange={(val) => updateInput('water', val)}
                unit=" glasses"
            />
            <InputSlider
                label="Screen time"
                min={0} max={16} step={0.5}
                value={dailyInput.screenTime}
                onChange={(val) => updateInput('screenTime', val)}
                unit=" hrs"
            />
            <PrimaryButton onClick={() => goToScreen(3)}>Continue</PrimaryButton>
        </Screen>
    );
};

export default DailyInput;