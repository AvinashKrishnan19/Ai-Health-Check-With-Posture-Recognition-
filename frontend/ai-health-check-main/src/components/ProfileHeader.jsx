// src/components/ProfileHeader.jsx
import React from 'react';

const ProfileHeader = ({ userData, detailed = false }) => {
    const bmi = (userData.weight / Math.pow(userData.height / 100, 2)).toFixed(1);

    return (
        <div className="profile-header">
            {detailed ? (
                <>
                    <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>Personal Health Profile</div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Based on your data</div>
                    <div className="profile-stats" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginTop: '16px' }}>
                        <div className="stat-box">
                            <div className="stat-value">{userData.age}</div>
                            <div className="stat-label">Age</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">{userData.weight}kg</div>
                            <div className="stat-label">Weight</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">{userData.height}cm</div>
                            <div className="stat-label">Height</div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Your Profile</div>
                    <div className="profile-stats">
                        <div className="stat-box">
                            <div className="stat-value">{bmi}</div>
                            <div className="stat-label">BMI</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">{userData.weight}kg</div>
                            <div className="stat-label">Weight</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileHeader;