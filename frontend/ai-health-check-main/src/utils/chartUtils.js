// src/utils/chartUtils.js
import Chart from 'chart.js/auto';

let pieChartInstance = null;
let lineChartInstance = null;

/**
 * Creates or updates the Doughnut chart for risk assessment.
 * @param {HTMLCanvasElement} canvasRef - The canvas element.
 * @param {number} obesityRisk - Percentage risk.
 * @param {number} cardiovascularRisk - Percentage risk.
 * @param {number} hypertensionRisk - Percentage risk.
 */
export function createPieChart(canvasRef, obesityRisk, cardiovascularRisk, hypertensionRisk) {
    if (!canvasRef) return;
    if (pieChartInstance) pieChartInstance.destroy();

    pieChartInstance = new Chart(canvasRef, {
        type: 'doughnut',
        data: {
            labels: ['Obesity Risk', 'Cardiovascular Risk', 'Hypertension Risk'],
            datasets: [{
                data: [obesityRisk, cardiovascularRisk, hypertensionRisk],
                backgroundColor: ['#3498db', '#e74c3c', '#f39c12'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 15, font: { size: 12 } }
                }
            }
        }
    });
}

/**
 * Creates or updates the Line chart for weekly comparison.
 * @param {HTMLCanvasElement} canvasRef - The canvas element.
 * @param {number[]} scores - Array of 7 scores for Mon-Sun.
 */
export function createComparisonChart(canvasRef, scores) {
    if (!canvasRef) return;
    if (lineChartInstance) lineChartInstance.destroy();

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    lineChartInstance = new Chart(canvasRef, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Health Score',
                data: scores,
                borderColor: '#2463eb',
                backgroundColor: 'rgba(36, 99, 235, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: '#2463eb'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: false, min: 30, max: 100 },
                x: { grid: { display: false } }
            }
        }
    });
}

// Function to reset all charts when needed
export function destroyCharts() {
    if (pieChartInstance) pieChartInstance.destroy();
    if (lineChartInstance) lineChartInstance.destroy();
    pieChartInstance = null;
    lineChartInstance = null;
}