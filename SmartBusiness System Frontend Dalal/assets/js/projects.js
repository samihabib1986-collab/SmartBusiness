// =========================
// Projects Management System
// =========================

// Check Authentication
const user = localStorage.getItem('user') || sessionStorage.getItem('user');
if (!user) {
    window.location.href = 'index.html';
}

const apiBase = './api';

let projects = [];
let currentPage = 1;
const rowsPerPage = 5;
let currentStatusFilter = "all";
let currentPriorityFilter = "all";
let searchTerm = "";

function getFallbackProjects() {
    return [
        {
            id: 1,
            name: 'Smart Business Management System',
            client: 'Smart Business Management System',
            description: 'Main system for managing projects, tasks, and employees.',
            priority: 'High',
            status: 'In Progress',
            progress: 65,
            deadline: '2026-12-31',
            team: 'Development Team'
        },
        {
            id: 2,
            name: 'Mobile App Dashboard',
            client: 'Business Team',
            description: 'Dashboard for project overview and analytics.',
            priority: 'Medium',
            status: 'Planning',
            progress: 25,
            deadline: '2026-10-15',
            team: 'UI Team'
        }
    ];
}

async function loadProjects() {
    try {
        const response = await fetch(`${apiBase}/get_projects.php`);
        const data = await response.json().catch(() => null);
        if (response.ok && data && data.success && Array.isArray(data.projects)) {
            projects = data.projects.map(project => ({
                id: Number(project.id),
                name: project.name,
                client: project.name,
                description: project.description || 'No description',
                priority: project.priority || 'Medium',
                status: project.status || 'Planning',
                progress: Number(project.progress) || 0,
                deadline: project.created_at ? new Date(project.created_at).toISOString().split('T')[0] : '',
                team: project.team || 'Unassigned'
            }));
            renderTable();
        } else {
            projects = getFallbackProjects();
            renderTable();
            showToast('Loaded sample projects because the server data is unavailable.', 'info');
        }
    } catch (error) {
        projects = getFallbackProjects();
        renderTable();
        showToast('Loaded sample projects because the server data is unavailable.', 'info');
    }
}

// DOM Elements
const tableBody = document.getElementById("projectsTableBody");
const addBtn = document.getElementById("addProjectBtn");
const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModalBtn");
const projectForm = document.getElementById("projectForm");
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
    loadProjects();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    addBtn.addEventListener("click", () => openModal());
    closeModal.addEventListener("click", () => closeModalFunc());
    cancelModal.addEventListener("click", () => closeModalFunc());
    projectForm.addEventListener("submit", handleFormSubmit);
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

// Filter Projects
function getFilteredProjects() {
    let filtered = [...projects];
    
    if (currentStatusFilter !== "all") {
        filtered = filtered.filter(proj => proj.status === currentStatusFilter);
    }
    
    if (currentPriorityFilter !== "all") {
        filtered = filtered.filter(proj => proj.priority === currentPriorityFilter);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(proj =>
            proj.name.toLowerCase().includes(searchTerm) ||
            proj.client.toLowerCase().includes(searchTerm) ||
            proj.description.toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
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

// Get Status Class
function getStatusClass(status) {
    switch(status) {
        case 'Planning': return 'status-badge-planning';
        case 'In Progress': return 'status-badge-inprogress';
        case 'On Hold': return 'status-badge-onhold';
        case 'Completed': return 'status-badge-completed';
        default: return 'status-badge-planning';
    }
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Render Table
function renderTable() {
    const filtered = getFilteredProjects();
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedData = filtered.slice(start, start + rowsPerPage);
    
    if (paginatedData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <p>No projects found</p>
                </td>
            </tr>
        `;
        paginationDiv.innerHTML = "";
        return;
    }
    
    tableBody.innerHTML = paginatedData.map(proj => `
        <tr>
            <td data-label="ID">${proj.id}</td>
            <td data-label="Project Name">
                <div class="project-info">
                    <a href="project-details.html?id=${proj.id}" class="project-name-link"><strong>${proj.name}</strong></a>
                    <small>${proj.description.substring(0, 50)}${proj.description.length > 50 ? '...' : ''}</small>
                </div>
            </td>
            <td data-label="Client">${proj.client}</td>
            <td data-label="Priority">
                <span class="priority-badge ${getPriorityClass(proj.priority)}">${proj.priority}</span>
            </td>
            <td data-label="Status">
                <span class="status-badge ${getStatusClass(proj.status)}">${proj.status}</span>
            </td>
            <td data-label="Progress">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${proj.progress}%"></div>
                    </div>
                    <span class="progress-text">${proj.progress}%</span>
                </div>
            </td>
            <td data-label="Deadline">${formatDate(proj.deadline)}</td>
            <td data-label="Actions">
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editProject(${proj.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteProject(${proj.id})">
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
    for (let i =1; i <= totalPages; i++) {
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

function openModal(project = null) {
    if (project) {
        modalTitle.textContent = "Edit Project";
        document.getElementById("projectId").value = project.id;
        document.getElementById("projectName").value = project.name;
        document.getElementById("projectClient").value = project.client;
        document.getElementById("projectDesc").value = project.description;
        document.getElementById("projectPriority").value = project.priority;
        document.getElementById("projectStatus").value = project.status;
        document.getElementById("projectProgress").value = project.progress;
        document.getElementById("projectDeadline").value = project.deadline;
        document.getElementById("projectTeam").value = project.team;
    } else {
        modalTitle.textContent = "Add New Project";
        projectForm.reset();
        document.getElementById("projectId").value = "";
        document.getElementById("projectProgress").value = "0";
    }
    modal.classList.add("show");
}

function closeModalFunc() {
    modal.classList.remove("show");
    projectForm.reset();
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById("projectId").value;
    const newProject = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById("projectName").value,
        client: document.getElementById("projectClient").value,
        description: document.getElementById("projectDesc").value || "No description",
        priority: document.getElementById("projectPriority").value,
        status: document.getElementById("projectStatus").value,
        progress: parseInt(document.getElementById("projectProgress").value) || 0,
        deadline: document.getElementById("projectDeadline").value,
        team: document.getElementById("projectTeam").value || "Not assigned"
    };

    try {
        const response = await fetch('./api/add_project.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject)
        });
        const data = await response.json().catch(() => ({ success: false, message: 'Failed to save project.' }));

        if (id) {
            const index = projects.findIndex(p => p.id === parseInt(id));
            projects[index] = newProject;
            showToast("Project updated successfully!", "success");
        } else {
            projects.push(newProject);
            showToast(data.success ? 'Project added successfully!' : 'Project saved locally.', data.success ? 'success' : 'info');
        }
    } catch (error) {
        if (id) {
            const index = projects.findIndex(p => p.id === parseInt(id));
            projects[index] = newProject;
        } else {
            projects.push(newProject);
        }
        showToast('Project saved locally. Server unavailable.', 'info');
    }
    
    closeModalFunc();
    renderTable();
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (project) openModal(project);
}

function deleteProject(id) {
    if (confirm("Are you sure you want to delete this project?")) {
        projects = projects.filter(p => p.id !== id);
        renderTable();
        showToast("Project deleted successfully!", "success");
        
        const filtered = getFilteredProjects();
        const totalPages = Math.ceil(filtered.length / rowsPerPage);
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
        renderTable();
    }
}

window.editProject = editProject;
window.deleteProject = deleteProject;
window.goToPage = goToPage;