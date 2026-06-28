// =========================
// Tasks Management System
// =========================

// Check Authentication
const user = localStorage.getItem('user') || sessionStorage.getItem('user');
if (!user) {
    window.location.href = 'index.html';
}

const apiBase = './api';

let tasks = [];

let currentPage = 1;
const rowsPerPage = 5;
let currentStatusFilter = "all";
let currentPriorityFilter = "all";
let searchTerm = "";

function getFallbackTasks() {
    return [
        {
            id: 1,
            title: 'Design Database Schema',
            description: 'Create the main database structure and relationships.',
            project: 'Smart Business Management System',
            assignedTo: 'Admin',
            priority: 'High',
            status: 'In Progress',
            dueDate: '2026-07-15',
            hours: 8
        },
        {
            id: 2,
            title: 'Build Dashboard Layout',
            description: 'Create the dashboard UI and navigation panels.',
            project: 'Mobile App Dashboard',
            assignedTo: 'Employee',
            priority: 'Medium',
            status: 'Pending',
            dueDate: '2026-07-20',
            hours: 5
        }
    ];
}

async function loadTasks() {
    try {
        const response = await fetch(`${apiBase}/get_tasks.php`);
        const data = await response.json().catch(() => null);
        if (response.ok && data && data.success && Array.isArray(data.tasks)) {
            tasks = data.tasks.map(task => ({
                id: Number(task.id),
                title: task.title,
                description: task.description || 'No description',
                project: task.project_name || `Project ${task.project_id}`,
                assignedTo: 'Unassigned',
                priority: 'Medium',
                status: task.status || 'Pending',
                dueDate: '',
                hours: 0
            }));
            renderTable();
        } else {
            tasks = getFallbackTasks();
            renderTable();
            showToast('Loaded sample tasks because the server data is unavailable.', 'info');
        }
    } catch (error) {
        tasks = getFallbackTasks();
        renderTable();
        showToast('Loaded sample tasks because the server data is unavailable.', 'info');
    }
}

// DOM Elements
const tableBody = document.getElementById("tasksTableBody");
const addBtn = document.getElementById("addTaskBtn");
const modal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModalBtn");
const taskForm = document.getElementById("taskForm");
const modalTitle = document.getElementById("modalTitle");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const searchInput = document.getElementById("searchInput");
const paginationDiv = document.getElementById("pagination");

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
    loadTasks();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    addBtn.addEventListener("click", () => openModal());
    closeModal.addEventListener("click", () => closeModalFunc());
    cancelModal.addEventListener("click", () => closeModalFunc());
    taskForm.addEventListener("submit", handleFormSubmit);
    statusFilter.addEventListener("change", (e) => {
        currentStatusFilter = e.target.value;
        currentPage = 1;
        renderTable();
    });
    priorityFilter.addEventListener("change", (e) => {
        currentPriorityFilter = e.target.value;
        currentPage = 1;
        renderTable();
    });
    searchInput.addEventListener("keyup", (e) => {
        searchTerm = e.target.value.toLowerCase();
        currentPage = 1;
        renderTable();
    });
    
    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModalFunc();
    });
    
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

// Get Priority Class
function getPriorityClass(priority) {
    switch(priority) {
        case 'High': return 'priority-high';
        case 'Medium': return 'priority-medium';
        case 'Low': return 'priority-low';
        default: return 'priority-medium';
    }
}

// Get Status Class for Tasks
function getTaskStatusClass(status) {
    switch(status) {
        case 'Pending': return 'task-status-pending';
        case 'In Progress': return 'task-status-inprogress';
        case 'Review': return 'task-status-review';
        case 'Completed': return 'task-status-completed';
        default: return 'task-status-pending';
    }
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Filter Tasks
function getFilteredTasks() {
    let filtered = [...tasks];
    
    if (currentStatusFilter !== "all") {
        filtered = filtered.filter(task => task.status === currentStatusFilter);
    }
    
    if (currentPriorityFilter !== "all") {
        filtered = filtered.filter(task => task.priority === currentPriorityFilter);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(task =>
            task.title.toLowerCase().includes(searchTerm) ||
            task.project.toLowerCase().includes(searchTerm) ||
            task.assignedTo.toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

// Render Table
function renderTable() {
    const filtered = getFilteredTasks();
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedData = filtered.slice(start, start + rowsPerPage);
    
    if (paginatedData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    <i class="fas fa-check-circle"></i>
                    <p>No tasks found</p>
                </td>
            </tr>
        `;
        paginationDiv.innerHTML = "";
        return;
    }
    
    tableBody.innerHTML = paginatedData.map(task => `
        <tr>
            <td data-label="ID">${task.id}</td>
            <td data-label="Task Title">
                <div class="task-info">
                    <a href="task-details.html?id=${task.id}" class="task-title-link"><strong>${task.title}</strong></a>
                    <small>${task.description.substring(0, 50)}${task.description.length > 50 ? '...' : ''}</small>
                </div>
            </td>
            <td data-label="Project">${task.project}</td>
            <td data-label="Assigned To">${task.assignedTo}</td>
            <td data-label="Priority">
                <span class="priority-badge ${getPriorityClass(task.priority)}">${task.priority}</span>
            </td>
            <td data-label="Status">
                <span class="status-badge ${getTaskStatusClass(task.status)}">${task.status}</span>
            </td>
            <td data-label="Due Date">${formatDate(task.dueDate)}</td>
            <td data-label="Actions">
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editTask(${task.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteTask(${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </table>
    `).join("");
    
    renderPagination(totalPages);
}

// Render Pagination
function renderPagination(totalPages) {
    if (totalPages <= 1) {
        paginationDiv.innerHTML = "";
        return;
    }
    
    let paginationHtml = "";
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }
    paginationDiv.innerHTML = paginationHtml;
}

function goToPage(page) {
    currentPage = page;
    renderTable();
}

function openModal(task = null) {
    if (task) {
        modalTitle.textContent = "Edit Task";
        document.getElementById("taskId").value = task.id;
        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskDesc").value = task.description;
        document.getElementById("taskProject").value = task.project;
        document.getElementById("taskAssignedTo").value = task.assignedTo;
        document.getElementById("taskPriority").value = task.priority;
        document.getElementById("taskStatus").value = task.status;
        document.getElementById("taskDueDate").value = task.dueDate;
        document.getElementById("taskHours").value = task.hours;
    } else {
        modalTitle.textContent = "Add New Task";
        taskForm.reset();
        document.getElementById("taskId").value = "";
        document.getElementById("taskDesc").value = "";
    }
    modal.classList.add("show");
}

function closeModalFunc() {
    modal.classList.remove("show");
    taskForm.reset();
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById("taskId").value;
    const newTask = {
        id: id ? parseInt(id) : Date.now(),
        title: document.getElementById("taskTitle").value,
        description: document.getElementById("taskDesc").value || "No description",
        project: document.getElementById("taskProject").value,
        assignedTo: document.getElementById("taskAssignedTo").value,
        priority: document.getElementById("taskPriority").value,
        status: document.getElementById("taskStatus").value,
        dueDate: document.getElementById("taskDueDate").value,
        hours: parseInt(document.getElementById("taskHours").value) || 0
    };

    try {
        const response = await fetch('./api/add_task.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        const data = await response.json().catch(() => ({ success: false, message: 'Failed to save task.' }));

        if (id) {
            const index = tasks.findIndex(t => t.id === parseInt(id));
            tasks[index] = newTask;
            showToast("Task updated successfully!", "success");
        } else {
            tasks.push(newTask);
            showToast(data.success ? 'Task added successfully!' : 'Task saved locally.', data.success ? 'success' : 'info');
        }
    } catch (error) {
        if (id) {
            const index = tasks.findIndex(t => t.id === parseInt(id));
            tasks[index] = newTask;
        } else {
            tasks.push(newTask);
        }
        showToast('Task saved locally. Server unavailable.', 'info');
    }
    
    closeModalFunc();
    renderTable();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) openModal(task);
}

function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(t => t.id !== id);
        renderTable();
        showToast("Task deleted successfully!", "success");
        
        const filtered = getFilteredTasks();
        const totalPages = Math.ceil(filtered.length / rowsPerPage);
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
        renderTable();
    }
}

window.editTask = editTask;
window.deleteTask = deleteTask;
window.goToPage = goToPage;