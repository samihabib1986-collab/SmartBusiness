// =========================
// Employees Management System
// =========================

// Sample Data
let employees = [
    {
        id: 1,
        name: "Ahmed Mansour",
        position: "Senior Frontend Developer",
        department: "Engineering",
        email: "ahmed@gmail.com",
        phone: "0982345523",
        status: "Active",
        avatar: "assets/images/users/user-2.jpg"
    },
    {
        id: 2,
        name: "Sara Khalil",
        position: "UI/UX Designer",
        department: "Design",
        email: "sara@gmail.com",
        phone: "0982345523",
        status: "Active",
        avatar: "assets/images/users/user-3.jpg"
    },
    {
        id: 3,
        name: "Omar Haddad",
        position: "Backend Developer",
        department: "Engineering",
        email: "omar@gmail.com",
        phone: "0982345523",
        status: "On Leave",
        avatar: "assets/images/users/user-4.jpg"
    },
    {
        id: 4,
        name: "Lina Mourad",
        position: "Marketing Manager",
        department: "Marketing",
        email: "lina@gmail.com",
        phone: "0982345523",
        status: "Active",
       avatar: "assets/images/users/user-5.jpg"
    },
    {
        id: 5,
        name: "Khaled Tamer",
        position: "Sales Director",
        department: "Sales",
        email: "khaled@gmail.com",
        phone: "0982345523",
        status: "Inactive",
        avatar: "assets/images/users/user-6.jpg"
    },
    {
        id: 6,
        name: "Nour ElDin",
        position: "HR Specialist",
        department: "HR",
        email: "nour@gmail.com",
        phone: "0982345523",
        status: "Inactive",
        avatar: "assets/images/users/user-7.jpg"
    }
];

let currentPage = 1;
const rowsPerPage = 5;
let currentFilter = "all";
let searchTerm = "";

// DOM Elements
const tableBody = document.getElementById("employeesTableBody");
const addBtn = document.getElementById("addEmployeeBtn");
const modal = document.getElementById("employeeModal");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModalBtn");
const employeeForm = document.getElementById("employeeForm");
const modalTitle = document.getElementById("modalTitle");
const departmentFilter = document.getElementById("departmentFilter");
const searchInput = document.getElementById("searchInput");
const paginationDiv = document.getElementById("pagination");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderTable();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    addBtn.addEventListener("click", () => openModal());
    closeModal.addEventListener("click", () => closeModalFunc());
    cancelModal.addEventListener("click", () => closeModalFunc());
    employeeForm.addEventListener("submit", handleFormSubmit);
    departmentFilter.addEventListener("change", (e) => {
        currentFilter = e.target.value;
        currentPage = 1;
        renderTable();
    });
    searchInput.addEventListener("keyup", (e) => {
        searchTerm = e.target.value.toLowerCase();
        currentPage = 1;
        renderTable();
    });
    
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModalFunc();
    });
    
    // Sidebar Toggle (same as dashboard)
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
    
    // Notifications
    const notifBtn = document.getElementById("notificationBtn");
    if (notifBtn) {
        notifBtn.addEventListener("click", () => {
            showToast("📢 You have 3 new notifications");
        });
    }
}

// Filter and Search
function getFilteredEmployees() {
    let filtered = [...employees];
    
    // Filter by department
    if (currentFilter !== "all") {
        filtered = filtered.filter(emp => emp.department === currentFilter);
    }
    
    // Filter by search
    if (searchTerm) {
        filtered = filtered.filter(emp =>
            emp.name.toLowerCase().includes(searchTerm) ||
            emp.position.toLowerCase().includes(searchTerm) ||
            emp.email.toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

// Render Table
// Render Table
function renderTable() {
    const filtered = getFilteredEmployees();
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedData = filtered.slice(start, start + rowsPerPage);
    
    if (paginatedData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>No employees found</p>
                </td>
            </tr>
        `;
        paginationDiv.innerHTML = "";
        return;
    }
    
    tableBody.innerHTML = paginatedData.map(emp => `
        <tr>
            <td data-label="ID">${emp.id}</td>
            <td data-label="Employee">
                <div class="employee-info">
                    <img src="${emp.avatar}" alt="${emp.name}" class="employee-avatar" onerror="this.src='https://via.placeholder.com/40'">
                    <a href="employee-details.html?id=${emp.id}" class="employee-name-link">${emp.name}</a>
                </div>
            </td>
            <td data-label="Position">${emp.position}</td>
            <td data-label="Department">${emp.department}</td>
            <td data-label="Email">${emp.email}</td>
            <td data-label="Phone">${emp.phone}</td>
            <td data-label="Status">
                <span class="status-badge status-${emp.status.toLowerCase().replace(' ', '')}">
                    ${emp.status}
                </span>
            </td>
            <td data-label="Actions">
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editEmployee(${emp.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteEmployee(${emp.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
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

// Go to Page
function goToPage(page) {
    currentPage = page;
    renderTable();
}

// Open Modal (Add/Edit)
function openModal(employee = null) {
    if (employee) {
        modalTitle.textContent = "Edit Employee";
        document.getElementById("employeeId").value = employee.id;
        document.getElementById("empName").value = employee.name;
        document.getElementById("empPosition").value = employee.position;
        document.getElementById("empDepartment").value = employee.department;
        document.getElementById("empEmail").value = employee.email;
        document.getElementById("empPhone").value = employee.phone;
        document.getElementById("empStatus").value = employee.status;
        document.getElementById("empAvatar").value = employee.avatar;
    } else {
        modalTitle.textContent = "Add New Employee";
        employeeForm.reset();
        document.getElementById("employeeId").value = "";
        document.getElementById("empDepartment").value = "";
    }
    modal.classList.add("show");
}

// Close Modal
function closeModalFunc() {
    modal.classList.remove("show");
    employeeForm.reset();
}

// Handle Form Submit
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById("employeeId").value;
    const newEmployee = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById("empName").value,
        position: document.getElementById("empPosition").value,
        department: document.getElementById("empDepartment").value,
        email: document.getElementById("empEmail").value,
        phone: document.getElementById("empPhone").value,
        status: document.getElementById("empStatus").value,
        avatar: document.getElementById("empAvatar").value || "https://via.placeholder.com/40"
    };

    try {
        const response = await fetch('./api/add_employee.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployee)
        });
        const data = await response.json().catch(() => ({ success: false, message: 'Failed to save employee.' }));

        if (id) {
            const index = employees.findIndex(emp => emp.id === parseInt(id));
            employees[index] = newEmployee;
            showToast("Employee updated successfully!", "success");
        } else {
            employees.push(newEmployee);
            showToast(data.success ? 'Employee added successfully!' : 'Employee saved locally.', data.success ? 'success' : 'info');
        }
    } catch (error) {
        if (id) {
            const index = employees.findIndex(emp => emp.id === parseInt(id));
            employees[index] = newEmployee;
        } else {
            employees.push(newEmployee);
        }
        showToast('Employee saved locally. Server unavailable.', 'info');
    }
    
    closeModalFunc();
    renderTable();
}

// Edit Employee
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) openModal(employee);
}

// Delete Employee
function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(emp => emp.id !== id);
        renderTable();
        showToast("Employee deleted successfully!", "success");
        
        // Adjust pagination if needed
        const filtered = getFilteredEmployees();
        const totalPages = Math.ceil(filtered.length / rowsPerPage);
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
        renderTable();
    }
}

// Toast Notification
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

// Make functions global for onclick
window.editEmployee = editEmployee;
window.deleteEmployee = deleteEmployee;
window.goToPage = goToPage;

// =========================
// User Dropdown Menu
// =========================

const userDropdown = document.getElementById('userDropdown');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownArrow = document.getElementById('dropdownArrow');

if (userDropdown) {
    // Toggle dropdown on click
    userDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
        if (dropdownArrow) {
            dropdownArrow.classList.toggle('rotated');
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target)) {
            dropdownMenu.classList.remove('show');
            if (dropdownArrow) {
                dropdownArrow.classList.remove('rotated');
            }
        }
    });
}

// =========================
// Logout Functionality
// =========================

const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        console.log('Logout button clicked'); // للتأكد إنه شغال
        
        // Clear stored user data
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        
        // Show logout message
        showToast('Logging out...', 'success');
        
        // Redirect to login page after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
} else {
    console.log('Logout button not found'); // للتأكد إنه الزر موجود
}