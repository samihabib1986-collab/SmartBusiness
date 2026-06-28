// =========================
// Project Details System
// =========================

// Check Authentication
const user = localStorage.getItem('user') || sessionStorage.getItem('user');
if (!user) {
    window.location.href = 'index.html';
}

// Get project ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id') || 1;

// Sample Project Data
const projectData = {
    1: {
        id: 1,
        name: "E-Commerce Platform",
        client: "TechStore",
        description: "Full-featured online store with payment integration, user authentication, and admin dashboard. Includes product management, order tracking, and customer support features.",
        priority: "High",
        status: "In Progress",
        progress: 65,
        startDate: "2025-09-01",
        deadline: "2026-05-15",
        tasks: [
            { name: "Design database schema", completed: true },
            { name: "Create wireframes", completed: false, status: "in-progress" },
            { name: "Implement authentication API", completed: false, status: "pending" },
            { name: "Frontend development", completed: false, status: "pending" }
        ],
        team: [
            { name: "Ahmed Mansour", role: "Frontend Lead", avatar: "assets/images/users/user-1.jpg" },
            { name: "Sara Khalil", role: "UI/UX Designer", avatar: "assets/images/users/user-3.jpg" },
            { name: "Omar Haddad", role: "Backend Developer", avatar: "assets/images/users/user-2.jpg" }
        ],
        milestones: [
            { name: "Project Kickoff", date: "2025-09-01", status: "completed" },
            { name: "MVP Launch", date: "2026-03-15", status: "in-progress" },
            { name: "Final Delivery", date: "2026-06-25", status: "pending" }
        ]
    },
    2: {
        id: 2,
        name: "Mobile App Design",
        client: "Creative Agency",
        description: "UI/UX design for iOS and Android app with modern interface and smooth animations.",
        priority: "Medium",
        status: "Planning",
        progress: 20,
        startDate: "2025-10-01",
        deadline: "2025-11-30",
        tasks: [
            { name: "Research and analysis", completed: true },
            { name: "Wireframing", completed: false, status: "in-progress" },
            { name: "UI Design", completed: false, status: "pending" }
        ],
        team: [
            { name: "Lina Mourad", role: "Design Lead", avatar: "assets/images/users/user-4.jpg" },
            { name: "Nour ElDin", role: "UI Designer", avatar: "assets/images/users/user-6.jpg" }
        ],
        milestones: [
            { name: "Research Complete", date: "2025-10-15", status: "completed" },
            { name: "Design Review", date: "2025-11-15", status: "in-progress" },
            { name: "Final Delivery", date: "2025-11-30", status: "pending" }
        ]
    }
};

let currentProject = projectData[projectId] || projectData[1];

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
    loadProjectData();
    setupEventListeners();
});

function loadProjectData() {
    // Basic Info
    document.getElementById('projectName').textContent = currentProject.name;
    document.getElementById('projectClient').innerHTML = `<i class="fas fa-building"></i> ${currentProject.client}`;
    document.getElementById('projectDesc').textContent = currentProject.description;
    document.getElementById('startDate').textContent = currentProject.startDate;
    document.getElementById('deadline').textContent = currentProject.deadline;
    
    // Status Badge
    const statusBadge = document.getElementById('projectStatusBadge');
    const statusClass = currentProject.status.toLowerCase().replace(' ', '');
    statusBadge.textContent = currentProject.status;
    statusBadge.className = `project-status ${statusClass}`;
    
    // Priority
    const priorityEl = document.getElementById('projectPriority');
    priorityEl.textContent = currentProject.priority;
    priorityEl.className = `priority-badge priority-${currentProject.priority.toLowerCase()}`;
    
    // Progress
    document.getElementById('progressValue').textContent = currentProject.progress;
    document.getElementById('progressPercent').textContent = currentProject.progress + '%';
    document.getElementById('progressFill').style.width = currentProject.progress + '%';
    
    // Tasks Count
    const totalTasks = currentProject.tasks.length;
    const completedTasks = currentProject.tasks.filter(t => t.completed).length;
    document.getElementById('tasksCount').textContent = totalTasks;
    
    // Team Count
    document.getElementById('teamCount').textContent = currentProject.team.length;
    
    // Team Members
    const teamContainer = document.getElementById('teamMembers');
    teamContainer.innerHTML = currentProject.team.map(member => `
        <div class="team-member">
            <img src="${member.avatar}" alt="${member.name}" onerror="this.src='https://via.placeholder.com/45'">
            <div>
                <h4>${member.name}</h4>
                <p>${member.role}</p>
            </div>
        </div>
    `).join('');
    
    // Tasks
    const tasksContainer = document.getElementById('projectTasks');
    tasksContainer.innerHTML = currentProject.tasks.map((task, index) => `
        <div class="task-item">
            <div class="task-checkbox">
                <input type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''}>
                <label for="task${index}">${task.name}</label>
            </div>
            <span class="task-status ${task.status || (task.completed ? 'completed' : 'pending')}">
                ${task.status === 'in-progress' ? 'In Progress' : (task.completed ? 'Completed' : 'Pending')}
            </span>
        </div>
    `).join('');
    
    // Milestones
    const milestonesContainer = document.getElementById('milestonesList');
    milestonesContainer.innerHTML = currentProject.milestones.map(milestone => `
        <div class="milestone-item">
            <div class="milestone-dot ${milestone.status}"></div>
            <div class="milestone-content">
                <h4>${milestone.name}</h4>
                <p>${milestone.date}</p>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Edit Modal
    const editModal = document.getElementById('editProjectModal');
    const editBtn = document.getElementById('editProjectBtn');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editForm = document.getElementById('editProjectForm');
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            document.getElementById('editName').value = currentProject.name;
            document.getElementById('editClient').value = currentProject.client;
            document.getElementById('editDesc').value = currentProject.description;
            document.getElementById('editPriority').value = currentProject.priority;
            document.getElementById('editStatus').value = currentProject.status;
            document.getElementById('editProgress').value = currentProject.progress;
            document.getElementById('editDeadline').value = currentProject.deadline;
            editModal.classList.add('show');
        });
    }
    
    function closeModal() {
        editModal.classList.remove('show');
    }
    
    if (closeEditModal) closeEditModal.addEventListener('click', closeModal);
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === editModal) closeModal();
    });
    
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            currentProject.name = document.getElementById('editName').value;
            currentProject.client = document.getElementById('editClient').value;
            currentProject.description = document.getElementById('editDesc').value;
            currentProject.priority = document.getElementById('editPriority').value;
            currentProject.status = document.getElementById('editStatus').value;
            currentProject.progress = parseInt(document.getElementById('editProgress').value);
            currentProject.deadline = document.getElementById('editDeadline').value;
            
            loadProjectData();
            closeModal();
            showToast('Project updated successfully!', 'success');
        });
    }
    
    // Delete Project
    const deleteBtn = document.getElementById('deleteProjectBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete "${currentProject.name}"?`)) {
                showToast('Project deleted! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'projects.html';
                }, 1500);
            }
        });
    }
    
    // Add Task
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            const newTask = prompt('Enter task name:');
            if (newTask && newTask.trim()) {
                currentProject.tasks.push({
                    name: newTask.trim(),
                    completed: false,
                    status: 'pending'
                });
                loadProjectData();
                showToast('Task added successfully!', 'success');
            }
        });
    }
    
    // Add Team Member
    const addMemberBtn = document.getElementById('addMemberBtn');
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', () => {
            const newName = prompt('Enter team member name:');
            const newRole = prompt('Enter role:');
            if (newName && newRole) {
                currentProject.team.push({
                    name: newName.trim(),
                    role: newRole.trim(),
                    avatar: 'https://via.placeholder.com/45'
                });
                loadProjectData();
                showToast('Team member added!', 'success');
            }
        });
    }
    
    // Task checkbox listeners (delegation)
    document.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox' && e.target.closest('.task-item')) {
            const label = e.target.nextElementSibling;
            const taskName = label.textContent;
            const task = currentProject.tasks.find(t => t.name === taskName);
            if (task) {
                task.completed = e.target.checked;
                const completedCount = currentProject.tasks.filter(t => t.completed).length;
                currentProject.progress = Math.round((completedCount / currentProject.tasks.length) * 100);
                loadProjectData();
                showToast(`Task marked as ${e.target.checked ? 'completed' : 'pending'}`, 'info');
            }
        }
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