// src/components/InputSlider.jsx
import React from 'react';

const InputSlider = ({ label, min, max, step = 1, value, onChange, unit = '' }) => (
    <div className="input-group">
        <label>
            {label}: <span style={{ float: 'right', color: '#2463eb' }}>{value}{unit}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
        />
    </div>
);

export default InputSlider;