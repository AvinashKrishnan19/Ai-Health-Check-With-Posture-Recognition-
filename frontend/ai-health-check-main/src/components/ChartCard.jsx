// src/components/ChartCard.jsx
import React, { useRef, useEffect } from 'react';

const ChartCard = ({ title, chartCreator, chartData, style = {} }) => {
    const canvasRef = useRef(null);
    const chartId = title.replace(/\s/g, ''); // Simple ID generation

    useEffect(() => {
        // chartCreator is a function that initializes the chart
        if (canvasRef.current) {
            chartCreator(canvasRef.current, ...chartData);
        }
    }, [chartData, chartCreator]);

    return (
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', margin: '16px 0', ...style }}>
            <h3 style={{ textAlign: 'center', marginBottom: '16px', color: '#1a1a1a' }}>{title}</h3>
            <canvas ref={canvasRef} id={chartId} style={{ maxHeight: '300px' }}></canvas>
        </div>
    );
};

export default ChartCard;