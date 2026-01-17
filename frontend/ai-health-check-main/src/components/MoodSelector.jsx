// src/components/MoodSelector.jsx
import React from 'react';

const MoodSelector = ({ selectedMood, onSelect }) => {
    const moods = [
        { level: 1, emoji: '😊' },
        { level: 2, emoji: '🙂' },
        { level: 3, emoji: '😐' },
        { level: 4, emoji: '😟' },
        { level: 5, emoji: '😫' },
    ];

    return (
        <div className="mood-selector">
            {moods.map(mood => (
                <button
                    key={mood.level}
                    className={`mood-btn ${selectedMood === mood.level ? 'selected' : ''}`}
                    onClick={() => onSelect(mood.level)}
                >
                    {mood.emoji}
                </button>
            ))}
        </div>
    );
};

export default MoodSelector;