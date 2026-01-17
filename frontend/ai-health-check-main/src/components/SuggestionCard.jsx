// src/components/SuggestionCard.jsx
import React from 'react';

const SuggestionCard = ({ title, text, icon }) => (
    <div className="suggestion-card">
        <h4>{icon} {title}</h4>
        <p>{text}</p>
    </div>
);

export default SuggestionCard;