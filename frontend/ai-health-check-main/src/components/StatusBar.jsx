// src/components/StatusBar.jsx
import React, { useState, useEffect } from 'react';

const StatusBar = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.getHours().toString().padStart(2, '0') + ':' +
                now.getMinutes().toString().padStart(2, '0')
            );
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="status-bar">
            <span>{currentTime}</span>
        </div>
    );
};

export default StatusBar;