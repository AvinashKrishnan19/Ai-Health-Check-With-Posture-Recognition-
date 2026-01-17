// src/components/NavDots.jsx
import React from 'react';

const screenIds = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // All screens

const NavDots = ({ currentScreen, goToScreen }) => {
    // Only show dots for screens 0-6 (main flow)
    const visibleScreens = [0, 1, 2, 3, 4, 5, 6]; 
    
    // Check if the current screen is one of the main flow screens
    const isMainFlowScreen = visibleScreens.includes(currentScreen);

    if (!isMainFlowScreen) return null; // Hide on Login/Signup

    return (
        <div className="nav-dots">
            {visibleScreens.map((num) => (
                <div
                    key={num}
                    className={`nav-dot ${currentScreen === num ? 'active' : ''}`}
                    onClick={() => goToScreen(num)}
                    title={`Go to screen ${num}`}
                ></div>
            ))}
        </div>
    );
};

export default NavDots;