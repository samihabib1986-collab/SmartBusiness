// =========================
// Task Details System
// =========================

// Check Authentication
const user = localStorage.getItem('user') || sessionStorage.getItem('user');
if (!user) {
    window.location.href = 'index.html';
}

// Get task ID from URL
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id') || 1;

// Sample Task Data
const taskData = {
    1: {
        id: 1,
        title: "Design Database Schema",
        description: "Design and implement the database schema for the e-commerce platform including users, products, orders, and payment tables. Ensure proper relationships and indexing for optimal performance.",
        project: "E-Commerce Platform",
        assignedTo: "Ahmed Mansour",
        assignedToRole: "Frontend Developer",
        assignedToAvatar: "assets/images/users/user-1.jpg",
        priority: "High",
        status: "In Progress",
        progress: 65,
        estHours: 8,
        startDate: "2025-12-01",
        dueDate: "2026-01-10",
        subtasks: [
            { name: "Create ERD diagram", completed: true, status: "completed" },
            { name: "Design users table", completed: false, status: "in-progress" },
            { name: "Design products table", completed: false, status: "pending" },
            { name: "Design orders table", completed: false, status: "pending" }
        ],
        attachments: [
            { name: "database_schema.pdf", size: "1.2 MB", uploadedBy: "Ahmed", icon: "fa-file-pdf" },
            { name: "er_diagram.png", size: "0.8 MB", uploadedBy: "Sara", icon: "fa-file-image" }
        ],
        comments: [
            { user: "Ahmed Mansour", avatar: "assets/images/users/user-1.jpg", text: "I've started working on the database schema. Will share the initial draft by tomorrow.", time: "2 hours ago" },
            { user: "Sara Khalil", avatar: "assets/images/users/user-3.jpg", text: "Please make sure to include indexes for better query performance.", time: "Yesterday" }
        ]
    }
};

let currentTask = taskData[taskId] || taskData[1];

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
    loadTaskData();
    setupEventListeners();
});

function loadTaskData() {
    // Basic Info
    document.getElementById('taskTitle').textContent = currentTask.title;
    document.getElementById('taskDesc').textContent = currentTask.description;
    document.getElementById('taskProject').innerHTML = `<i class="fas fa-layer-group"></i> ${currentTask.project}`;
    document.getElementById('taskProgress').textContent = currentTask.progress;
    document.getElementById('taskPriority').textContent = currentTask.priority;
    document.getElementById('taskEstHours').textContent = currentTask.estHours;
    document.getElementById('progressPercent').textContent = currentTask.progress + '%';
    document.getElementById('progressFill').style.width = currentTask.progress + '%';
    document.getElementById('startDate').textContent = currentTask.startDate;
    document.getElementById('dueDate').textContent = currentTask.dueDate;
    
    // Status Badge
    const statusBadge = document.getElementById('taskStatusBadge');
    const statusClass = currentTask.status.toLowerCase().replace(' ', '');
    statusBadge.textContent = currentTask.status;
    statusBadge.className = `task-status ${statusClass}`;
    
    // Priority Badge color
    const priorityEl = document.getElementById('taskPriority');
    if (currentTask.priority === 'High') {
        priorityEl.style.color = '#ef4444';
    } else if (currentTask.priority === 'Medium') {
        priorityEl.style.color = '#f59e0b';
    } else {
        priorityEl.style.color = '#22c55e';
    }
    
    // Assignee
    document.getElementById('assigneeName').textContent = currentTask.assignedTo;
    document.getElementById('assigneeRole').textContent = currentTask.assignedToRole;
    document.getElementById('assigneeAvatar').src = currentTask.assignedToAvatar;
    
    // Time Remaining
    const dueDate = new Date(currentTask.dueDate);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('timeRemaining').textContent = diffDays > 0 ? `${diffDays} days` : 'Overdue';
    
    // Subtasks
    const subtasksContainer = document.getElementById('subtasksList');
    subtasksContainer.innerHTML = currentTask.subtasks.map((subtask, index) => `
        <div class="subtask-item">
            <div class="subtask-checkbox">
                <input type="checkbox" id="subtask${index}" ${subtask.completed ? 'checked' : ''}>
                <label for="subtask${index}">${subtask.name}</label>
            </div>
            <span class="subtask-status ${subtask.status}">${subtask.status === 'completed' ? 'Completed' : (subtask.status === 'in-progress' ? 'In Progress' : 'Pending')}</span>
        </div>
    `).join('');
    
    // Attachments
    const attachmentsContainer = document.getElementById('attachmentsList');
    attachmentsContainer.innerHTML = currentTask.attachments.map(att => `
        <div class="attachment-item">
            <i class="fas ${att.icon}"></i>
            <div class="attachment-info">
                <h4>${att.name}</h4>
                <p>${att.size} • Uploaded by ${att.uploadedBy}</p>
            </div>
            <button class="btn-download"><i class="fas fa-download"></i></button>
        </div>
    `).join('');
    
    // Comments
    const commentsContainer = document.getElementById('commentsList');
    commentsContainer.innerHTML = currentTask.comments.map(comment => `
        <div class="comment-item">
            <img src="${comment.avatar}" alt="${comment.user}">
            <div class="comment-content">
                <div class="comment-header">
                    <h4>${comment.user}</h4>
                    <span>${comment.time}</span>
                </div>
                <p>${comment.text}</p>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Edit Modal
    const editModal = document.getElementById('editTaskModal');
    const editBtn = document.getElementById('editTaskBtn');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editForm = document.getElementById('editTaskForm');
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            document.getElementById('editTitle').value = currentTask.title;
            document.getElementById('editDesc').value = currentTask.description;
            document.getElementById('editProject').value = currentTask.project;
            document.getElementById('editAssignedTo').value = currentTask.assignedTo;
            document.getElementById('editPriority').value = currentTask.priority;
            document.getElementById('editStatus').value = currentTask.status;
            document.getElementById('editProgress').value = currentTask.progress;
            document.getElementById('editHours').value = currentTask.estHours;
            document.getElementById('editStartDate').value = currentTask.startDate;
            document.getElementById('editDueDate').value = currentTask.dueDate;
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
            
            currentTask.title = document.getElementById('editTitle').value;
            currentTask.description = document.getElementById('editDesc').value;
            currentTask.project = document.getElementById('editProject').value;
            currentTask.assignedTo = document.getElementById('editAssignedTo').value;
            currentTask.priority = document.getElementById('editPriority').value;
            currentTask.status = document.getElementById('editStatus').value;
            currentTask.progress = parseInt(document.getElementById('editProgress').value);
            currentTask.estHours = parseInt(document.getElementById('editHours').value);
            currentTask.startDate = document.getElementById('editStartDate').value;
            currentTask.dueDate = document.getElementById('editDueDate').value;
            
            loadTaskData();
            closeModal();
            showToast('Task updated successfully!', 'success');
        });
    }
    
    // Delete Task
    const deleteBtn = document.getElementById('deleteTaskBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete "${currentTask.title}"?`)) {
                showToast('Task deleted! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'tasks.html';
                }, 1500);
            }
        });
    }
    
    // Add Subtask
    const addSubtaskBtn = document.getElementById('addSubtaskBtn');
    if (addSubtaskBtn) {
        addSubtaskBtn.addEventListener('click', () => {
            const newSubtask = prompt('Enter subtask name:');
            if (newSubtask && newSubtask.trim()) {
                currentTask.subtasks.push({
                    name: newSubtask.trim(),
                    completed: false,
                    status: 'pending'
                });
                loadTaskData();
                showToast('Subtask added!', 'success');
            }
        });
    }
    
    // Add Attachment
    const addAttachmentBtn = document.getElementById('addAttachmentBtn');
    if (addAttachmentBtn) {
        addAttachmentBtn.addEventListener('click', () => {
            showToast('Upload feature coming soon!', 'info');
        });
    }
    
    // Post Comment
    const postCommentBtn = document.getElementById('postCommentBtn');
    const commentInput = document.getElementById('commentInput');
    
    if (postCommentBtn && commentInput) {
        postCommentBtn.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            if (commentText) {
                currentTask.comments.push({
                    user: "Dalal",
                    avatar: "assets/images/users/user-1.jpg",
                    text: commentText,
                    time: "Just now"
                });
                loadTaskData();
                commentInput.value = '';
                showToast('Comment posted!', 'success');
            }
        });
        
        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                postCommentBtn.click();
            }
        });
    }
    
    // Subtask checkbox listeners
    document.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox' && e.target.closest('.subtask-item')) {
            const label = e.target.nextElementSibling;
            const subtaskName = label.textContent;
            const subtask = currentTask.subtasks.find(s => s.name === subtaskName);
            if (subtask) {
                subtask.completed = e.target.checked;
                subtask.status = e.target.checked ? 'completed' : 'pending';
                const completedCount = currentTask.subtasks.filter(s => s.completed).length;
                currentTask.progress = Math.round((completedCount / currentTask.subtasks.length) * 100);
                loadTaskData();
                showToast(`Subtask marked as ${e.target.checked ? 'completed' : 'pending'}`, 'info');
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