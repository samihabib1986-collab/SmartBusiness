const apiBase = '/api';
const tokenKey = 'authToken';
const userKey = 'user';

function getTokenFromStorage() {
  return localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
}

function getUserFromStorage() {
  const raw = localStorage.getItem(userKey) || sessionStorage.getItem(userKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setToken(token, remember) {
  if (remember) {
    localStorage.setItem(tokenKey, token);
  } else {
    sessionStorage.setItem(tokenKey, token);
  }
}

function setUser(user, remember) {
  const payload = JSON.stringify(user);
  if (remember) {
    localStorage.setItem(userKey, payload);
  } else {
    sessionStorage.setItem(userKey, payload);
  }
}

function clearAuthState() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
  sessionStorage.removeItem(tokenKey);
  sessionStorage.removeItem(userKey);
}

function showToast(message, type = 'info') {
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `notification-toast ${type}`;
  toast.innerHTML = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

async function apiRequest(path, options = {}) {
  const token = getTokenFromStorage();
  const headers = options.headers || {};

  if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

async function fetchCurrentUser() {
  try {
    const data = await apiRequest('/me', { method: 'GET' });
    const remember = !!localStorage.getItem(tokenKey);
    setUser(data.user, remember);
    return data.user;
  } catch (error) {
    clearAuthState();
    return null;
  }
}

function updateUserUI(user) {
  if (!user) return;
  const nameElements = document.querySelectorAll('.user-details h6, .user-info-small .name, .page-welcome-name');
  const roleElements = document.querySelectorAll('.user-details span, .user-info-small small, .user-role');

  nameElements.forEach((el) => {
    el.textContent = user.name;
  });
  roleElements.forEach((el) => {
    el.textContent = user.role || 'Employee';
  });
}

function logout() {
  clearAuthState();
  window.location.href = 'index.html';
}

async function redirectIfAuthenticated() {
  const token = getTokenFromStorage();
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath === '/' || currentPath.endsWith('index.html');

  if (token && isLoginPage) {
    window.location.href = 'dashboard.html';
    return true;
  }
  return false;
}

async function redirectIfNotAuthenticated() {
  const token = getTokenFromStorage();
  if (!token) {
    window.location.href = 'index.html';
    return false;
  }

  const user = await fetchCurrentUser();
  if (!user) {
    window.location.href = 'index.html';
    return false;
  }

  updateUserUI(user);
  attachLogoutButton();
  return true;
}

function attachLogoutButton() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (!logoutBtn) return;
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
}

function setupDefaultAuth() {
  const user = getUserFromStorage();
  if (user) {
    updateUserUI(user);
  }
  attachLogoutButton();
}

function setAuthState(user, token, remember) {
  setUser(user, remember);
  setToken(token, remember);
}

window.app = {
  getTokenFromStorage,
  getUserFromStorage,
  setToken,
  setUser,
  setAuthState,
  clearAuthState,
  apiRequest,
  fetchCurrentUser,
  updateUserUI,
  logout,
  showToast,
  redirectIfAuthenticated,
  redirectIfNotAuthenticated,
  setupDefaultAuth,
};

window.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  if (currentPath === '/' || currentPath.endsWith('index.html')) {
    redirectIfAuthenticated();
  } else {
    redirectIfNotAuthenticated();
  }
});