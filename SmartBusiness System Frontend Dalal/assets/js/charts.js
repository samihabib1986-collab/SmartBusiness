// =========================
// Projects Progress Chart
// =========================

const projectsCtx = document.getElementById('projectsChart');

new Chart(projectsCtx, {
    type: 'doughnut',
    data: {
        labels: ['Completed', 'In Progress', 'Pending'],
        datasets: [{
            data: [45, 35, 20],
            backgroundColor: [
                '#22c55e',
                '#3b82f6',
                '#f59e0b'
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});


// =========================
// Employees Performance Chart
// =========================

const employeesCtx = document.getElementById('employeesChart');

new Chart(employeesCtx, {
    type: 'bar',
    data: {
        labels: ['Ali', 'Sara', 'Omar', 'Lina', 'Khaled'],
        datasets: [{
            label: 'Performance %',
            data: [85, 90, 78, 88, 95],
            backgroundColor: '#4f46e5'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});