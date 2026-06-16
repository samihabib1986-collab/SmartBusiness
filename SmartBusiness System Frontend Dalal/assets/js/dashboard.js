// =========================
// Check Authentication
// =========================

// Check if user is logged in
const user = localStorage.getItem('user') || sessionStorage.getItem('user');

if (!user) {
    // Redirect to login page if not logged in
    window.location.href = 'index.html';
}

// Optional: Display user name in sidebar
try {
    const userData = JSON.parse(user);
    const userNameElement = document.querySelector('.user-details h6');
    if (userNameElement && userData.name) {
        userNameElement.textContent = userData.name;
    }
    
    const userRoleElement = document.querySelector('.user-details span');
    if (userRoleElement && userData.role) {
        userRoleElement.textContent = userData.role;
    }
} catch(e) {}

// =========================
// Toast Notification Function (مهم تكون أولاً)
// =========================

function showToast(message, type = "info") {
    // Remove existing toast
    const existingToast = document.querySelector(".notification-toast");
    if (existingToast) existingToast.remove();
    
    // Create new toast
    const toast = document.createElement("div");
    toast.className = `notification-toast ${type}`;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =========================
// Dashboard Enhancements
// =========================

document.addEventListener('DOMContentLoaded', function() {

    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (toggleBtn && sidebar) {
        const sidebarState = localStorage.getItem('sidebarCollapsed');
        if (sidebarState === 'true') {
            sidebar.classList.add('collapsed');
            if (mainContent) {
                mainContent.style.marginLeft = '0';
            }
        }
        
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            sidebar.classList.toggle('collapsed');
            
            if (mainContent) {
                if (sidebar.classList.contains('collapsed')) {
                    mainContent.style.marginLeft = '0';
                    localStorage.setItem('sidebarCollapsed', 'true');
                } else {
                    mainContent.style.marginLeft = '280px';
                    localStorage.setItem('sidebarCollapsed', 'false');
                }
            }
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    showToast('🔍 Searching for: "' + searchTerm + '"', 'info');
                    this.value = '';
                }
            }
        });
    }

    const notifBtn = document.getElementById('notificationBtn');
    const badge = document.getElementById('notificationBadge');
    let notifCount = 3;
    
    if (notifBtn) {
        notifBtn.addEventListener('click', function() {
            showToast('📢 You have ' + notifCount + ' new notifications', 'info');
            notifCount = 0;
            if (badge) {
                badge.style.display = 'none';
            }
        });
    }

    const cards = document.querySelectorAll('.card-box');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('p').innerText;
            showToast('📊 View details for: ' + title, 'info');
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 576) {
            const sidebarState = localStorage.getItem('sidebarCollapsed');
            if (sidebarState === 'true') {
                mainContent.style.marginLeft = '0';
            } else {
                mainContent.style.marginLeft = '280px';
            }
        } else {
            if (mainContent) {
                mainContent.style.marginLeft = '0';
            }
        }
    });

});

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