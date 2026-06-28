// =========================
// Analytics System
// =========================

// Check Authentication
const user = localStorage.getItem('user') || sessionStorage.getItem('user');
if (!user) {
    window.location.href = 'index.html';
}

// Sample Data for Analytics
let analyticsData = {
    weeklyData: [12, 19, 15, 22, 18, 25, 30],
    monthlyData: [45, 52, 48, 60, 55, 70, 65, 80, 75, 85, 90, 95],
    departmentData: {
        labels: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'],
        values: [35, 20, 15, 18, 12]
    },
    performers: [
        { name: "Ahmed Mansour", role: "Senior Developer", tasks: 24, avatar: "A", score: 98 },
        { name: "Sara Khalil", role: "UI/UX Designer", tasks: 18, avatar: "S", score: 95 },
        { name: "Omar Haddad", role: "Backend Developer", tasks: 22, avatar: "O", score: 92 },
        { name: "Lina Mourad", role: "Marketing Lead", tasks: 15, avatar: "L", score: 88 },
        { name: "Khaled Tamer", role: "Sales Director", tasks: 12, avatar: "K", score: 85 }
    ]
};

let currentPeriod = "week";
let trendChart, departmentChart, weeklyChart, monthlyChart;

// Toast Function
function showToast(message, type = "info") {
    const existingToast = document.querySelector(".notification-toast");
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement("div");
    toast.className = `notification-toast ${type}`;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    updateMetrics();
    initCharts();
    loadPerformers();
    setupEventListeners();
});

function updateMetrics() {
    document.getElementById("avgCompletion").textContent = "78%";
    document.getElementById("avgTime").textContent = "5.2";
    document.getElementById("productivity").textContent = "82%";
    document.getElementById("onTimeRate").textContent = "71%";
}

function initCharts() {
    createTrendChart();
    createDepartmentChart();
    createWeeklyChart();
    createMonthlyChart();
}

function createTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    const metric = document.getElementById('trendMetric').value;
    
    let data, label;
    if (metric === 'tasks') {
        data = [45, 52, 48, 60, 55, 70];
        label = 'Tasks Completed';
    } else if (metric === 'projects') {
        data = [8, 10, 12, 15, 14, 18];
        label = 'Projects Started';
    } else {
        data = [120, 135, 140, 160, 155, 180];
        label = 'Hours Logged';
    }
    
    if (trendChart) trendChart.destroy();
    
    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: label,
                data: data,
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#4f46e5',
                pointBorderColor: 'white',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function createDepartmentChart() {
    const ctx = document.getElementById('departmentChart').getContext('2d');
    
    departmentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: analyticsData.departmentData.labels,
            datasets: [{
                data: analyticsData.departmentData.values,
                backgroundColor: ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function createWeeklyChart() {
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    
    weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Tasks Completed',
                data: analyticsData.weeklyData,
                backgroundColor: '#4f46e5',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function createMonthlyChart() {
    const ctx = document.getElementById('monthlyChart').getContext('2d');
    
    monthlyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Progress %',
                data: analyticsData.monthlyData,
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function loadPerformers() {
    const grid = document.getElementById('performersGrid');
    const type = document.getElementById('performerType').value;
    
    let performersData = [...analyticsData.performers];
    
    if (type === 'tasks') {
        performersData.sort((a, b) => b.tasks - a.tasks);
    } else if (type === 'projects') {
        performersData = performersData.map(p => ({ ...p, score: Math.floor(Math.random() * 30) + 70 }));
        performersData.sort((a, b) => b.score - a.score);
    } else {
        performersData.sort((a, b) => b.score - a.score);
    }
    
    grid.innerHTML = performersData.slice(0, 5).map(performer => `
        <div class="performer-card">
            <div class="performer-avatar">${performer.avatar}</div>
            <div class="performer-info">
                <h4>${performer.name}</h4>
                <p>${performer.role}</p>
            </div>
            <div class="performer-score">
                ${type === 'tasks' ? performer.tasks + ' tasks' : performer.score + '%'}
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Period buttons
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPeriod = btn.dataset.period;
            showToast(`Analytics updated for: ${btn.textContent}`, 'info');
            
            // Update data based on period
            if (currentPeriod === 'week') {
                analyticsData.weeklyData = [12, 19, 15, 22, 18, 25, 30];
            } else if (currentPeriod === 'month') {
                analyticsData.weeklyData = [25, 30, 35, 40, 38, 42, 45];
            } else if (currentPeriod === 'quarter') {
                analyticsData.weeklyData = [40, 45, 50, 55, 52, 58, 60];
            } else {
                analyticsData.weeklyData = [55, 60, 65, 70, 68, 72, 75];
            }
            
            createWeeklyChart();
            createMonthlyChart();
        });
    });
    
    // Trend metric selector
    document.getElementById('trendMetric').addEventListener('change', () => createTrendChart());
    
    // Performer type selector
    document.getElementById('performerType').addEventListener('change', () => loadPerformers());
    
    // Sidebar Toggle
    const toggleBtn = document.getElementById("sidebarToggleBtn");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");
    
    if (toggleBtn && sidebar) {
        const sidebarState = localStorage.getItem("sidebarCollapsed");
        if (sidebarState === "true") {
            sidebar.classList.add("collapsed");
            if (mainContent) mainContent.style.marginLeft = "0";
        }
        
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
            if (mainContent) {
                if (sidebar.classList.contains("collapsed")) {
                    mainContent.style.marginLeft = "0";
                    localStorage.setItem("sidebarCollapsed", "true");
                } else {
                    mainContent.style.marginLeft = "280px";
                    localStorage.setItem("sidebarCollapsed", "false");
                }
            }
        });
    }
    
    // User Dropdown
    const userDropdown = document.getElementById('userDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownArrow = document.getElementById('dropdownArrow');
    
    if (userDropdown) {
        userDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            if (dropdownArrow) dropdownArrow.classList.toggle('rotated');
        });
        
        document.addEventListener('click', (e) => {
            if (!userDropdown.contains(e.target)) {
                dropdownMenu.classList.remove('show');
                if (dropdownArrow) dropdownArrow.classList.remove('rotated');
            }
        });
    }
    
    // Notifications
    const notifBtn = document.getElementById("notificationBtn");
    if (notifBtn) {
        notifBtn.addEventListener("click", () => {
            showToast("📢 You have 3 new notifications");
        });
    }
    
    // Search
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                showToast(`🔍 Analyzing: "${e.target.value}"`, 'info');
                e.target.value = "";
            }
        });
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            showToast('Logging out...', 'success');
            setTimeout(() => window.location.href = 'index.html', 1000);
        });
    }
}