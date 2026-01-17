// src/components/Screen.jsx
import React from 'react';

const Screen = ({ screenId, activeScreen, children }) => {
    const isActive = activeScreen === screenId;
    return (
        <div className={`screen ${isActive ? 'active' : ''}`} id={`screen${screenId}`}>
            {children}
        </div>
    );
};

export default Screen;