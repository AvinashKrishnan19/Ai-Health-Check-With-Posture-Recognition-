// src/components/Button.jsx
import React from 'react';

export const PrimaryButton = ({ onClick, children, type = 'button', style = {} }) => (
    <button type={type} className="primary-btn" onClick={onClick} style={style}>
        {children}
    </button>
);

export const SecondaryButton = ({ onClick, children, type = 'button', style = {} }) => (
    <button type={type} className="secondary-btn" onClick={onClick} style={style}>
        {children}
    </button>
);

export const HamburgerButton = ({ onClick }) => (
    <button className="hamburger" onClick={onClick}>
        ☰
    </button>
);