// =========================
// Reports & Analytics System
// =========================

// Check Authentication
const user = localStorage.getItem('user') || sessionStorage.getItem('user');
if (!user) {
    window.location.href = 'index.html';
}

// Mock Data with dates between Dec 2025 - May 2026
let employeesData = [
    { id: 1, name: "Ahmed Mansour", department: "Engineering", status: "Active", joinDate: "2025-12-15" },
    { id: 2, name: "Sara Khalil", department: "Design", status: "Active", joinDate: "2026-01-10" },
    { id: 3, name: "Omar Haddad", department: "Engineering", status: "On Leave", joinDate: "2025-12-20" },
    { id: 4, name: "Lina Mourad", department: "Marketing", status: "Active", joinDate: "2026-02-05" },
    { id: 5, name: "Khaled Tamer", department: "Sales", status: "Active", joinDate: "2026-01-25" },
    { id: 6, name: "Nour ElDin", department: "HR", status: "Active", joinDate: "2026-03-01" },
    { id: 7, name: "Youssef Karam", department: "Engineering", status: "Active", joinDate: "2026-02-15" },
    { id: 8, name: "Maya Haddad", department: "Design", status: "On Leave", joinDate: "2026-03-10" }
];

let projectsData = [
    { id: 1, name: "AI-Powered Analytics Platform", status: "In Progress", priority: "High", startDate: "2025-12-01" },
    { id: 2, name: "Mobile Banking App", status: "Planning", priority: "High", startDate: "2026-01-10" },
    { id: 3, name: "Inventory Management System", status: "In Progress", priority: "Medium", startDate: "2025-12-15" },
    { id: 4, name: "Corporate Website Redesign", status: "Completed", priority: "Low", startDate: "2025-11-01" },
    { id: 5, name: "IoT Dashboard", status: "On Hold", priority: "Medium", startDate: "2026-01-20" },
    { id: 6, name: "Cloud Infrastructure Upgrade", status: "Planning", priority: "High", startDate: "2026-02-01" },
    { id: 7, name: "HR Management Portal", status: "In Progress", priority: "Medium", startDate: "2026-01-05" },
    { id: 8, name: "Customer Support Chatbot", status: "Review", priority: "High", startDate: "2026-02-15" },
    { id: 9, name: "Blockchain Integration", status: "Planning", priority: "Low", startDate: "2026-03-01" },
    { id: 10, name: "E-Learning Platform", status: "In Progress", priority: "Medium", startDate: "2025-12-10" }
];

let tasksData = [
    { id: 1, title: "Design database schema for AI platform", project: "AI-Powered Analytics Platform", status: "Completed", priority: "High", dueDate: "2025-12-20" },
    { id: 2, title: "Create mobile app wireframes", project: "Mobile Banking App", status: "In Progress", priority: "High", dueDate: "2026-02-10" },
    { id: 3, title: "Implement authentication API", project: "Inventory Management System", status: "Pending", priority: "Medium", dueDate: "2026-01-25" },
    { id: 4, title: "Design corporate website", project: "Corporate Website Redesign", status: "Completed", priority: "Low", dueDate: "2025-11-30" },
    { id: 5, title: "Integration testing for IoT", project: "IoT Dashboard", status: "On Hold", priority: "Medium", dueDate: "2026-03-15" },
    { id: 6, title: "Cloud migration documentation", project: "Cloud Infrastructure Upgrade", status: "Pending", priority: "High", dueDate: "2026-03-20" },
    { id: 7, title: "HR portal frontend development", project: "HR Management Portal", status: "In Progress", priority: "Medium", dueDate: "2026-02-28" },
    { id: 8, title: "Chatbot NLP integration", project: "Customer Support Chatbot", status: "Review", priority: "High", dueDate: "2026-03-10" },
    { id: 9, title: "Blockchain smart contracts", project: "Blockchain Integration", status: "Pending", priority: "Low", dueDate: "2026-04-15" },
    { id: 10, title: "E-learning course creation", project: "E-Learning Platform", status: "In Progress", priority: "Medium", dueDate: "2026-01-30" },
    { id: 11, title: "AI model training", project: "AI-Powered Analytics Platform", status: "In Progress", priority: "High", dueDate: "2026-01-15" },
    { id: 12, title: "Mobile app backend development", project: "Mobile Banking App", status: "Pending", priority: "High", dueDate: "2026-03-05" },
    { id: 13, title: "Inventory API development", project: "Inventory Management System", status: "Completed", priority: "Medium", dueDate: "2026-01-10" },
    { id: 14, title: "Website content migration", project: "Corporate Website Redesign", status: "Completed", priority: "Low", dueDate: "2025-12-05" },
    { id: 15, title: "IoT sensor configuration", project: "IoT Dashboard", status: "Pending", priority: "Medium", dueDate: "2026-04-01" },
    { id: 16, title: "Cloud security audit", project: "Cloud Infrastructure Upgrade", status: "Planning", priority: "High", dueDate: "2026-03-25" },
    { id: 17, title: "HR portal testing", project: "HR Management Portal", status: "Review", priority: "Medium", dueDate: "2026-03-18" },
    { id: 18, title: "Chatbot UI/UX design", project: "Customer Support Chatbot", status: "Completed", priority: "High", dueDate: "2026-02-20" },
    { id: 19, title: "Blockchain workshop", project: "Blockchain Integration", status: "Planning", priority: "Low", dueDate: "2026-05-01" },
    { id: 20, title: "E-learning video production", project: "E-Learning Platform", status: "Pending", priority: "Medium", dueDate: "2026-02-25" }
];

let activities = [
    { date: "2026-05-15", type: "task", title: "Completed: Design database schema for AI platform", status: "Completed", user: "Ahmed Mansour" },
    { date: "2026-05-14", type: "project", title: "Started: Blockchain Integration", status: "Planning", user: "Omar Haddad" },
    { date: "2026-05-14", type: "task", title: "Updated: Create mobile app wireframes", status: "In Progress", user: "Sara Khalil" },
    { date: "2026-05-13", type: "employee", title: "New employee: Maya Haddad", status: "Added", user: "Admin" },
    { date: "2026-05-12", type: "task", title: "Completed: Chatbot UI/UX design", status: "Completed", user: "Lina Mourad" },
    { date: "2026-05-11", type: "project", title: "Updated: AI-Powered Analytics Platform", status: "75% Complete", user: "Ahmed Mansour" },
    { date: "2026-05-10", type: "task", title: "Started: HR portal testing", status: "Review", user: "Khaled Tamer" },
    { date: "2026-05-09", type: "task", title: "Completed: Inventory API development", status: "Completed", user: "Nour ElDin" },
    { date: "2026-05-08", type: "project", title: "Launched: Corporate Website Redesign", status: "Live", user: "Youssef Karam" },
    { date: "2026-05-07", type: "task", title: "Updated: AI model training", status: "80% Complete", user: "Ahmed Mansour" },
    { date: "2026-05-06", type: "employee", title: "Employee promotion: Sara Khalil", status: "Senior Designer", user: "Admin" },
    { date: "2026-05-05", type: "task", title: "Started: Mobile app backend", status: "In Progress", user: "Omar Haddad" },
    { date: "2026-05-04", type: "project", title: "Milestone reached: HR Portal", status: "90% Complete", user: "Nour ElDin" },
    { date: "2026-05-03", type: "task", title: "Completed: Website content migration", status: "Completed", user: "Lina Mourad" },
    { date: "2026-05-02", type: "task", title: "Started: Cloud security audit", status: "Planning", user: "Khaled Tamer" }
];

let mainChart;

// DOM Elements
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const applyFilterBtn = document.getElementById("applyDateFilter");
const resetFilterBtn = document.getElementById("resetFilter");
const exportBtn = document.getElementById("exportReport");
const chartTypeSelect = document.getElementById("chartType");
const refreshBtn = document.getElementById("refreshActivity");

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
    setDefaultDates();
    updateStats();
    initCharts();
    loadActivities();
    setupEventListeners();
});

function setDefaultDates() {
    // Default dates: from Dec 2025 to May 2026
    startDateInput.value = "2025-12-01";
    endDateInput.value = "2026-05-31";
}

function updateStats() {
    document.getElementById("totalEmployees").textContent = employeesData.length;
    document.getElementById("totalProjects").textContent = projectsData.length;
    document.getElementById("totalTasks").textContent = tasksData.length;
    
    const completedTasks = tasksData.filter(t => t.status === "Completed").length;
    const completionRate = Math.round((completedTasks / tasksData.length) * 100);
    document.getElementById("completionRate").textContent = `${completionRate}%`;
}

function initCharts() {
    createMainChart();
    createProjectsStatusChart();
    createTasksPriorityChart();
}

function createMainChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    const chartType = chartTypeSelect.value;
    
    const statusCounts = {
        'Pending': tasksData.filter(t => t.status === 'Pending').length,
        'In Progress': tasksData.filter(t => t.status === 'In Progress').length,
        'Review': tasksData.filter(t => t.status === 'Review').length,
        'Completed': tasksData.filter(t => t.status === 'Completed').length
    };
    
    if (mainChart) mainChart.destroy();
    
    if (chartType === 'pie') {
        mainChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    data: Object.values(statusCounts),
                    backgroundColor: ['#f59e0b', '#3b82f6', '#8b5cf6', '#22c55e']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    } else {
        mainChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    label: 'Number of Tasks',
                    data: Object.values(statusCounts),
                    backgroundColor: chartType === 'bar' ? '#4f46e5' : '#22c55e',
                    borderColor: '#4f46e5',
                    borderWidth: 2,
                    fill: chartType === 'line'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}

function createProjectsStatusChart() {
    const ctx = document.getElementById('projectsStatusChart').getContext('2d');
    const statusCounts = {
        'Planning': projectsData.filter(p => p.status === 'Planning').length,
        'In Progress': projectsData.filter(p => p.status === 'In Progress').length,
        'Review': projectsData.filter(p => p.status === 'Review').length,
        'On Hold': projectsData.filter(p => p.status === 'On Hold').length,
        'Completed': projectsData.filter(p => p.status === 'Completed').length
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts),
                backgroundColor: ['#f59e0b', '#3b82f6', '#8b5cf6', '#6b7280', '#22c55e']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

function createTasksPriorityChart() {
    const ctx = document.getElementById('tasksPriorityChart').getContext('2d');
    const priorityCounts = {
        'High': tasksData.filter(t => t.priority === 'High').length,
        'Medium': tasksData.filter(t => t.priority === 'Medium').length,
        'Low': tasksData.filter(t => t.priority === 'Low').length
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(priorityCounts),
            datasets: [{
                data: Object.values(priorityCounts),
                backgroundColor: ['#ef4444', '#f59e0b', '#22c55e']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

function loadActivities() {
    const tbody = document.getElementById("activityTableBody");
    tbody.innerHTML = activities.map(activity => `
        <tr>
            <td data-label="Date">${formatDate(activity.date)}</td>
            <td data-label="Type">
                <span class="activity-type type-${activity.type}">${activity.type}</span>
            </td>
            <td data-label="Title">${activity.title}</td>
            <td data-label="Status">${activity.status}</td>
            <td data-label="User">${activity.user}</td>
        </tr>
    `).join("");
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function applyDateFilter() {
    const start = startDateInput.value;
    const end = endDateInput.value;
    
    if (start && end) {
        showToast(`Filtering reports from ${start} to ${end}`, 'success');
        // In real app, you would filter data here
        updateStats();
        initCharts();
    }
}

function resetFilter() {
    setDefaultDates();
    showToast('Filters reset to default (Dec 2025 - May 2026)', 'info');
    updateStats();
    initCharts();
}

function exportReport() {
    showToast('Generating PDF...', 'info');
    
    // Get current stats
    const totalEmployees = document.getElementById("totalEmployees").textContent;
    const totalProjects = document.getElementById("totalProjects").textContent;
    const totalTasks = document.getElementById("totalTasks").textContent;
    const completionRate = document.getElementById("completionRate").textContent;
    
    // Get chart images (capture canvases)
    const mainChartCanvas = document.getElementById('mainChart');
    const projectsChartCanvas = document.getElementById('projectsStatusChart');
    const tasksChartCanvas = document.getElementById('tasksPriorityChart');
    
    // Create HTML content for PDF (complete page)
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>SmartBusiness - Full Report</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Segoe UI', 'Poppins', Arial, sans-serif;
                    padding: 30px;
                    color: #0f172a;
                    background: white;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 3px solid #4f46e5;
                    padding-bottom: 20px;
                }
                .logo {
                    font-size: 28px;
                    font-weight: bold;
                    color: #4f46e5;
                    margin-bottom: 10px;
                }
                .logo span {
                    color: #0f172a;
                }
                .subtitle {
                    color: #64748b;
                    font-size: 14px;
                }
                .date {
                    color: #666;
                    margin-top: 10px;
                    font-size: 12px;
                }
                h1 {
                    color: #4f46e5;
                    font-size: 24px;
                    margin: 10px 0;
                }
                h2 {
                    color: #0f172a;
                    margin-top: 30px;
                    margin-bottom: 15px;
                    border-left: 4px solid #4f46e5;
                    padding-left: 15px;
                    font-size: 18px;
                }
                h3 {
                    font-size: 14px;
                    margin-bottom: 10px;
                    color: #0f172a;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 20px;
                    margin: 30px 0;
                }
                .stat-card {
                    background: #f8fafc;
                    padding: 20px;
                    border-radius: 12px;
                    text-align: center;
                    border: 1px solid #e2e8f0;
                }
                .stat-card h3 {
                    font-size: 28px;
                    margin: 0;
                    color: #4f46e5;
                }
                .stat-card p {
                    margin: 5px 0 0;
                    color: #64748b;
                    font-size: 12px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 15px 0;
                    font-size: 12px;
                }
                th {
                    background: #f8fafc;
                    padding: 10px 12px;
                    text-align: left;
                    border-bottom: 2px solid #e2e8f0;
                    font-weight: 600;
                }
                td {
                    padding: 8px 12px;
                    border-bottom: 1px solid #e2e8f0;
                }
                .priority-high { color: #ef4444; font-weight: bold; }
                .priority-medium { color: #f59e0b; }
                .priority-low { color: #22c55e; }
                .status-completed { color: #22c55e; font-weight: bold; }
                .status-progress { color: #3b82f6; }
                .status-pending { color: #f59e0b; }
                .status-review { color: #8b5cf6; }
                .status-onhold { color: #6b7280; }
                .activity-type {
                    display: inline-block;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 10px;
                    font-weight: 500;
                }
                .type-task { background: #dbeafe; color: #1e40af; }
                .type-project { background: #dcfce7; color: #166534; }
                .type-employee { background: #fef3c7; color: #92400e; }
                .footer {
                    text-align: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid #e2e8f0;
                    color: #94a3b8;
                    font-size: 11px;
                }
                .page-break {
                    page-break-before: always;
                }
                .note {
                    font-size: 10px;
                    color: #94a3b8;
                    margin-top: 10px;
                    font-style: italic;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">Smart<span>Business</span></div>
                <h1>Executive Report</h1>
                <div class="subtitle">Complete Business Performance Overview</div>
                <div class="date">Generated on: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString()}</div>
            </div>
            
            <!-- Statistics Section -->
            <h2>📊 Key Performance Indicators</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>${totalEmployees}</h3>
                    <p>Total Employees</p>
                </div>
                <div class="stat-card">
                    <h3>${totalProjects}</h3>
                    <p>Total Projects</p>
                </div>
                <div class="stat-card">
                    <h3>${totalTasks}</h3>
                    <p>Total Tasks</p>
                </div>
                <div class="stat-card">
                    <h3>${completionRate}</h3>
                    <p>Completion Rate</p>
                </div>
            </div>
            
            <!-- Projects Section -->
            <h2>📁 Projects Overview</h2>
            <table>
                <thead>
                    <tr><th>ID</th><th>Project Name</th><th>Status</th><th>Priority</th><th>Start Date</th></tr>
                </thead>
                <tbody>
                    ${projectsData.map(p => `
                        <tr>
                            <td>${p.id}</td>
                            <td>${p.name}</td>
                            <td class="status-${p.status === 'Completed' ? 'completed' : (p.status === 'In Progress' ? 'progress' : (p.status === 'Review' ? 'review' : 'pending'))}">${p.status}</td>
                            <td class="priority-${p.priority.toLowerCase()}">${p.priority}</td>
                            <td>${p.startDate}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="note">Total Projects: ${projectsData.length} | Active: ${projectsData.filter(p => p.status !== 'Completed').length} | Completed: ${projectsData.filter(p => p.status === 'Completed').length}</div>
            
            <!-- Tasks Section -->
            <h2>✅ Tasks Summary</h2>
            <table>
                <thead>
                    <tr><th>ID</th><th>Task Title</th><th>Project</th><th>Status</th><th>Priority</th><th>Due Date</th></tr>
                </thead>
                <tbody>
                    ${tasksData.map(t => `
                        <tr>
                            <td>${t.id}</td>
                            <td>${t.title}</td>
                            <td>${t.project}</td>
                            <td class="status-${t.status === 'Completed' ? 'completed' : (t.status === 'In Progress' ? 'progress' : (t.status === 'Review' ? 'review' : 'pending'))}">${t.status}</td>
                            <td class="priority-${t.priority.toLowerCase()}">${t.priority}</td>
                            <td>${t.dueDate}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="note">Total Tasks: ${tasksData.length} | Completed: ${tasksData.filter(t => t.status === 'Completed').length} | In Progress: ${tasksData.filter(t => t.status === 'In Progress').length} | Pending: ${tasksData.filter(t => t.status === 'Pending').length}</div>
            
            <!-- Employees Section -->
            <h2>👥 Employees Directory</h2>
            <table>
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Department</th><th>Status</th><th>Join Date</th></tr>
                </thead>
                <tbody>
                    ${employeesData.map(e => `
                        <tr>
                            <td>${e.id}</td>
                            <td>${e.name}</td>
                            <td>${e.department}</td>
                            <td style="color: ${e.status === 'Active' ? '#22c55e' : (e.status === 'On Leave' ? '#f59e0b' : '#ef4444')}">${e.status}</td>
                            <td>${e.joinDate}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="note">Total Employees: ${employeesData.length} | Active: ${employeesData.filter(e => e.status === 'Active').length}</div>
            
            <!-- Recent Activities Section -->
            <h2>📋 Recent Activities</h2>
            <table>
                <thead>
                    <tr><th>Date</th><th>Type</th><th>Activity</th><th>Status</th><th>User</th></tr>
                </thead>
                <tbody>
                    ${activities.map(a => `
                        <tr>
                            <td>${a.date}</td>
                            <td><span class="activity-type type-${a.type}">${a.type}</span></td>
                            <td>${a.title}</td>
                            <td>${a.status}</td>
                            <td>${a.user}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="note">Showing last ${activities.length} activities</div>
            
            <!-- Footer -->
            <div class="footer">
                <p>SmartBusiness System - Confidential Management Report</p>
                <p>This report was automatically generated by SmartBusiness Intelligence Engine</p>
                <p>© 2026 SmartBusiness - All Rights Reserved</p>
            </div>
        </body>
        </html>
    `;
    
    // Create Blob and trigger download as HTML (which opens in browser and can be printed as PDF)
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.href = url;
    link.download = `SmartBusiness_Complete_Report_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('Report generated successfully! Open the HTML file and press Ctrl+P to save as PDF', 'success');
}

function refreshActivity() {
    showToast('Refreshing activity data...', 'info');
    setTimeout(() => {
        loadActivities();
        showToast('Activity data refreshed!', 'success');
    }, 800);
}

function setupEventListeners() {
    applyFilterBtn.addEventListener("click", applyDateFilter);
    resetFilterBtn.addEventListener("click", resetFilter);
    exportBtn.addEventListener("click", exportReport);
    refreshBtn.addEventListener("click", refreshActivity);
    chartTypeSelect.addEventListener("change", () => createMainChart());
    
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
                showToast(`🔍 Searching for: "${e.target.value}"`, 'info');
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