// =========================
// Settings System
// =========================

// Check Authentication
const user = localStorage.getItem('user') || sessionStorage.getItem('user');
if (!user) {
    window.location.href = 'index.html';
}

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
    setupTabs();
    setupEventListeners();
    loadSavedSettings();
});

function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.settings-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            panels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
}

function loadSavedSettings() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.querySelector('.theme-option[data-theme="dark"]')?.classList.add('selected');
    } else {
        document.querySelector('.theme-option[data-theme="light"]')?.classList.add('selected');
    }
}

function setupEventListeners() {
    // Profile Form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Profile updated successfully!', 'success');
        });
    }
    
    // Password Form
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmPassword').value;
            
            if (newPass !== confirmPass) {
                showToast('Passwords do not match!', 'error');
                return;
            }
            if (newPass.length < 6) {
                showToast('Password must be at least 6 characters', 'error');
                return;
            }
            showToast('Password updated successfully!', 'success');
            passwordForm.reset();
        });
    }
    
    // Avatar Upload
    const uploadBtn = document.getElementById('uploadAvatarBtn');
    const avatarInput = document.getElementById('avatarInput');
    const profileImage = document.getElementById('profileImage');
    const removeAvatarBtn = document.getElementById('removeAvatarBtn');
    
    if (uploadBtn && avatarInput) {
        uploadBtn.addEventListener('click', () => avatarInput.click());
        avatarInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    profileImage.src = event.target.result;
                    showToast('Profile picture updated!', 'success');
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }
    
    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', () => {
            profileImage.src = 'assets/images/users/user-1.jpg';
            showToast('Profile picture removed', 'info');
        });
    }
    
    // Theme Options
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            if (theme === 'dark') {
                document.body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                if (document.getElementById('darkModeBtn')?.querySelector('i')) {
                    document.getElementById('darkModeBtn').querySelector('i').classList.remove('fa-moon');
                    document.getElementById('darkModeBtn').querySelector('i').classList.add('fa-sun');
                }
            } else if (theme === 'light') {
                document.body.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                if (document.getElementById('darkModeBtn')?.querySelector('i')) {
                    document.getElementById('darkModeBtn').querySelector('i').classList.remove('fa-sun');
                    document.getElementById('darkModeBtn').querySelector('i').classList.add('fa-moon');
                }
            }
            showToast(`${theme === 'dark' ? 'Dark' : 'Light'} mode activated`, 'success');
        });
    });
    
    // Toggle switches save
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const settingName = e.target.id || 'setting';
            showToast(`${settingName} ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
        });
    });
    
    // Export Data
    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const data = {
                settings: {
                    language: document.getElementById('language')?.value,
                    dateFormat: document.getElementById('dateFormat')?.value,
                    timezone: document.getElementById('timezone')?.value,
                    itemsPerPage: document.getElementById('itemsPerPage')?.value
                },
                exportDate: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `smartbusiness_backup_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(link);
            showToast('Data exported successfully!', 'success');
        });
    }
    
    // Import Data
    const importBtn = document.getElementById('importDataBtn');
    if (importBtn) {
        importBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        showToast('Data imported successfully!', 'success');
                    } catch (err) {
                        showToast('Invalid file format', 'error');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        });
    }
    
    // Clear Data
    const clearDataBtn = document.getElementById('clearDataBtn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (confirm('⚠️ WARNING: This will delete ALL application data. This action cannot be undone. Are you sure?')) {
                localStorage.clear();
                sessionStorage.clear();
                showToast('All data cleared! Page will refresh.', 'success');
                setTimeout(() => window.location.reload(), 1500);
            }
        });
    }
    
    // Delete Account
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            if (confirm('⚠️ DANGER: This will permanently delete your account and ALL data. This action cannot be undone. Are you ABSOLUTELY sure?')) {
                if (confirm('Type "DELETE" to confirm')) {
                    const confirmation = prompt('Type "DELETE" to confirm account deletion:');
                    if (confirmation === 'DELETE') {
                        localStorage.clear();
                        sessionStorage.clear();
                        showToast('Account deleted. Redirecting...', 'success');
                        setTimeout(() => window.location.href = 'index.html', 1500);
                    } else {
                        showToast('Deletion cancelled', 'info');
                    }
                }
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
    
    // Search
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                showToast(`🔍 Searching settings for: "${e.target.value}"`, 'info');
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