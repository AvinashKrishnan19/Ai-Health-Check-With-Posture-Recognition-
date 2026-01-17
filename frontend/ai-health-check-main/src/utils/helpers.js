// src/utils/helpers.js

/**
 * Generates the array of days for the current month's calendar grid.
 * @returns {object} - { monthYear: string, days: (number|null)[] }
 */
export function generateCalendarDays() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const today = now.getDate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const monthYear = `${months[month]} ${year}`;

    // Get day of the week for the 1st of the month (0=Sunday, 6=Saturday)
    const firstDay = new Date(year, month, 1).getDay();
    // Get total days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Add nulls for preceding empty days
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    return { monthYear, days, today };
}

/**
 * Calculates a mock weekly score trend for the comparison chart.
 * @param {number} currentScore - The score for the last day (Today).
 * @returns {number[]} - An array of 7 scores for Mon-Sun.
 */
export function generateWeeklyScoreTrend(currentScore) {
    const scores = [];
    const variation = 8; 

    // Generate 6 previous scores
    for (let i = 0; i < 6; i++) {
        // Base score is slightly less than the current score
        const baseScore = currentScore - (6 - i) * 2; 
        const randomVariation = Math.floor(Math.random() * variation) - variation / 2;
        scores.push(Math.min(100, Math.max(30, baseScore + randomVariation)));
    }
    scores.push(currentScore); // Last day is today's score

    return scores;
}