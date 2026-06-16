// =========================
// Employee Details System
// =========================

// Check Authentication
const user = localStorage.getItem('user') || sessionStorage.getItem('user');
if (!user) {
    window.location.href = 'index.html';
}

// Get employee ID from URL (if passed)
const urlParams = new URLSearchParams(window.location.search);
const employeeId = urlParams.get('id') || 1;

// Sample Employee Data
const employeeData = {
    1: {
        id: 1,
        name: "Ahmed Mansour",
        position: "Senior Frontend Developer",
        department: "Engineering",
        email: "ahmed@gmail.com",
        phone: "+963 982 345 523",
        location: "Damacus, Syria",
        status: "Active",
        avatar: "assets/images/users/user-1.jpg",
        bio: "Experienced frontend developer with expertise in React, Vue.js, and modern web technologies. Passionate about creating responsive and user-friendly interfaces.",
        skills: ["React.js", "Vue.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"],
        tasksCompleted: 24,
        projectsDone: 8,
        yearsExp: 3,
        workHistory: [
            { title: "Senior Frontend Developer", period: "2022 - Present", desc: "Leading frontend development team, building scalable web applications." },
            { title: "Frontend Developer", period: "2020 - 2022", desc: "Developed responsive websites and web applications for various clients." },
            { title: "Junior Developer", period: "2019 - 2020", desc: "Started career as a junior developer, learning modern web technologies." }
        ],
        currentProjects: [
            { name: "E-Commerce Platform", role: "Frontend development", status: "in-progress" },
            { name: "Mobile App Design", role: "UI components", status: "completed" }
        ]
    }
};

let currentEmployee = employeeData[employeeId] || employeeData[1];
let performanceChart;

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
    loadEmployeeData();
    initPerformanceChart();
    setupEventListeners();
});

function loadEmployeeData() {
    // Profile Card
    document.getElementById('empAvatar').src = currentEmployee.avatar;
    document.getElementById('empName').textContent = currentEmployee.name;
    document.getElementById('empPosition').textContent = currentEmployee.position;
    document.getElementById('empDepartment').innerHTML = `<i class="fas fa-building"></i> ${currentEmployee.department}`;
    document.getElementById('empEmail').textContent = currentEmployee.email;
    document.getElementById('empPhone').textContent = currentEmployee.phone;
    document.getElementById('empLocation').textContent = currentEmployee.location;
    document.getElementById('empBio').textContent = currentEmployee.bio;
    
    // Status Badge
    const statusBadge = document.getElementById('empStatusBadge');
    statusBadge.textContent = currentEmployee.status;
    if (currentEmployee.status === 'Active') {
        statusBadge.className = 'emp-status';
    } else if (currentEmployee.status === 'On Leave') {
        statusBadge.className = 'emp-status onleave';
    } else {
        statusBadge.className = 'emp-status inactive';
    }
    
    // Stats
    document.getElementById('tasksCount').textContent = currentEmployee.tasksCompleted;
    document.getElementById('projectsCount').textContent = currentEmployee.projectsDone;
    document.getElementById('yearsCount').textContent = currentEmployee.yearsExp;
    
    // Skills
    const skillsContainer = document.getElementById('empSkills');
    skillsContainer.innerHTML = currentEmployee.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    
    // Work History
    const timelineContainer = document.querySelector('.timeline');
    timelineContainer.innerHTML = currentEmployee.workHistory.map(work => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h4>${work.title}</h4>
                <p class="timeline-date">${work.period}</p>
                <p>${work.desc}</p>
            </div>
        </div>
    `).join('');
    
    // Current Projects
    const projectsContainer = document.getElementById('empProjects');
    projectsContainer.innerHTML = currentEmployee.currentProjects.map(project => `
        <div class="project-item">
            <div class="project-info">
                <h4>${project.name}</h4>
                <p>${project.role}</p>
            </div>
            <span class="project-status ${project.status}">${project.status === 'in-progress' ? 'In Progress' : 'Completed'}</span>
        </div>
    `).join('');
}

function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Performance %',
                data: [75, 78, 82, 85, 88, 92],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true
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

function setupEventListeners() {
    // Edit Modal
    const editModal = document.getElementById('editEmployeeModal');
    const editBtn = document.getElementById('editEmployeeBtn');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editForm = document.getElementById('editEmployeeForm');
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            document.getElementById('editName').value = currentEmployee.name;
            document.getElementById('editPosition').value = currentEmployee.position;
            document.getElementById('editDepartment').value = currentEmployee.department;
            document.getElementById('editEmail').value = currentEmployee.email;
            document.getElementById('editPhone').value = currentEmployee.phone;
            document.getElementById('editLocation').value = currentEmployee.location;
            document.getElementById('editStatus').value = currentEmployee.status;
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
            
            currentEmployee.name = document.getElementById('editName').value;
            currentEmployee.position = document.getElementById('editPosition').value;
            currentEmployee.department = document.getElementById('editDepartment').value;
            currentEmployee.email = document.getElementById('editEmail').value;
            currentEmployee.phone = document.getElementById('editPhone').value;
            currentEmployee.location = document.getElementById('editLocation').value;
            currentEmployee.status = document.getElementById('editStatus').value;
            
            loadEmployeeData();
            closeModal();
            showToast('Employee updated successfully!', 'success');
        });
    }
    
    // Delete Employee
    const deleteBtn = document.getElementById('deleteEmployeeBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete ${currentEmployee.name}?`)) {
                showToast('Employee deleted! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'employees.html';
                }, 1500);
            }
        });
    }
    
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