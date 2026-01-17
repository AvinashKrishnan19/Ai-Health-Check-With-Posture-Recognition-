// src/components/Comparison.jsx
import React from 'react';

const Comparison = ({ currentScore, avgActivity, avgWater }) => {
    return (
        <div className="comparison">
            <div className="comparison-row">
                <span style={{ color: '#666' }}>Current Score</span>
                <strong id="currentScoreDisplay">{currentScore}</strong>
            </div>
            <div className="comparison-row">
                <span style={{ color: '#666' }}>Weekly Average</span>
                <strong>68</strong> {/* Placeholder from original JS */}
            </div>
            <div className="comparison-row">
                <span style={{ color: '#666' }}>Activity (Daily Avg)</span>
                <strong>{avgActivity} min</strong>
            </div>
            <div className="comparison-row">
                <span style={{ color: '#666' }}>Water Intake (Avg)</span>
                <strong>{avgWater} glasses</strong>
            </div>
        </div>
    );
};

export default Comparison;