// src/components/Calendar.jsx
import React from 'react';
import { generateCalendarDays } from '../utils/helpers';

const Calendar = () => {
    const { monthYear, days, today } = generateCalendarDays();

    return (
        <div className="calendar">
            <div className="calendar-header">{monthYear}</div>
            <div className="calendar-grid">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, index) => (
                    <div
                        key={index}
                        className="calendar-day"
                        style={{ fontWeight: 700, color: '#666', padding: '10px 4px', fontSize: '14px' }}
                    >
                        {d}
                    </div>
                ))}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${day === today ? 'today' : ''}`}
                    >
                        {day || ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;