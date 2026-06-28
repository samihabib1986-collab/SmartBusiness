// =========================
// Profile System
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
    setupEventListeners();
    loadProfileData();
});

// Profile Data
let profileData = {
    name: "Dalal Ahmad",
    email: "dalal@gmail.com",
    phone: "+963 967 345 252",
    jobTitle: "System Administrator",
    location: "Damascus, Syria",
    bio: "Experienced system administrator with over 5 years of experience in managing business systems and teams. Passionate about technology and continuous improvement.",
    department: "Administration",
    joinDate: "January 15, 2026",
    empId: "EMP-001",
    status: "Active",
    skills: ["Project Management", "System Architecture", "Team Leadership", "Database Design", "API Development", "Cloud Computing"]
};

function loadProfileData() {
    // Update all profile fields
    document.getElementById('profileName').textContent = profileData.name;
    document.getElementById('profileRole').textContent = profileData.jobTitle;
    document.getElementById('profileLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${profileData.location}`;
    document.getElementById('profileBio').textContent = profileData.bio;
    
    document.getElementById('displayFullName').textContent = profileData.name;
    document.getElementById('displayEmail').textContent = profileData.email;
    document.getElementById('displayPhone').textContent = profileData.phone;
    document.getElementById('displayDepartment').textContent = profileData.department;
    document.getElementById('displayJobTitle').textContent = profileData.jobTitle;
    document.getElementById('displayJoinDate').textContent = profileData.joinDate;
    document.getElementById('displayEmpId').textContent = profileData.empId;
    document.getElementById('displayStatus').textContent = profileData.status;
    
    // Load skills
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = profileData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
}

function setupEventListeners() {
    // Edit Profile Modal
    const editModal = document.getElementById('editProfileModal');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editProfileForm = document.getElementById('editProfileForm');
    
    // Open modal from edit button (add edit button to profile card)
    const profileCard = document.querySelector('.profile-card');
    if (profileCard && !document.getElementById('editProfileBtn')) {
        const editBtn = document.createElement('button');
        editBtn.id = 'editProfileBtn';
        editBtn.className = 'btn-edit-profile';
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
        editBtn.style.cssText = 'margin-top: 15px; padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 30px; cursor: pointer; font-size: 13px; width: 100%;';
        profileCard.querySelector('.profile-social').before(editBtn);
        editBtn.addEventListener('click', () => openEditModal());
    }
    
    function openEditModal() {
        document.getElementById('editName').value = profileData.name;
        document.getElementById('editEmail').value = profileData.email;
        document.getElementById('editPhone').value = profileData.phone;
        document.getElementById('editJobTitle').value = profileData.jobTitle;
        document.getElementById('editLocation').value = profileData.location;
        document.getElementById('editBio').value = profileData.bio;
        editModal.classList.add('show');
    }
    
    function closeModal() {
        editModal.classList.remove('show');
    }
    
    if (closeEditModal) closeEditModal.addEventListener('click', closeModal);
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === editModal) closeModal();
    });
    
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            profileData.name = document.getElementById('editName').value;
            profileData.email = document.getElementById('editEmail').value;
            profileData.phone = document.getElementById('editPhone').value;
            profileData.jobTitle = document.getElementById('editJobTitle').value;
            profileData.location = document.getElementById('editLocation').value;
            profileData.bio = document.getElementById('editBio').value;
            
            loadProfileData();
            closeModal();
            showToast('Profile updated successfully!', 'success');
        });
    }
    
    // Avatar Upload
    const editAvatarBtn = document.getElementById('editAvatarBtn');
    const avatarUpload = document.getElementById('avatarUpload');
    const profileAvatar = document.getElementById('profileAvatar');
    
    if (editAvatarBtn && avatarUpload) {
        editAvatarBtn.addEventListener('click', () => avatarUpload.click());
        avatarUpload.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    profileAvatar.src = event.target.result;
                    showToast('Profile picture updated!', 'success');
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }
    
    // Add Skill
    const addSkillBtn = document.getElementById('addSkillBtn');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', () => {
            const newSkill = prompt('Enter new skill:');
            if (newSkill && newSkill.trim()) {
                profileData.skills.push(newSkill.trim());
                loadProfileData();
                showToast('Skill added successfully!', 'success');
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