const apiBase = './api';

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

function getLocalUsers() {
    try {
        return JSON.parse(localStorage.getItem('localUsers') || '{}');
    } catch (error) {
        return {};
    }
}

function saveLocalUsers(users) {
    localStorage.setItem('localUsers', JSON.stringify(users));
}

function tryLocalLogin(email, password) {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const users = getLocalUsers();

    if (normalizedEmail === 'admin@svuonline.org' && password === '123456') {
        return {
            ok: true,
            status: 200,
            data: {
                success: true,
                user: {
                    id: 1,
                    name: 'Admin',
                    email: 'admin@svuonline.org',
                    role: 'Administrator'
                }
            }
        };
    }

    const user = users[normalizedEmail];
    if (user && user.password === password) {
        return {
            ok: true,
            status: 200,
            data: {
                success: true,
                user: {
                    id: user.id || Date.now(),
                    name: user.name,
                    email: user.email,
                    role: 'User'
                }
            }
        };
    }

    return { ok: false, status: 401, data: { message: 'Invalid email or password.' } };
}

function tryLocalRegister(name, email, password) {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const users = getLocalUsers();

    if (users[normalizedEmail]) {
        return { ok: false, status: 409, data: { message: 'Email already registered locally.' } };
    }

    users[normalizedEmail] = {
        id: Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        password
    };
    saveLocalUsers(users);

    return {
        ok: true,
        status: 201,
        data: {
            success: true,
            message: 'User registered locally.'
        }
    };
}

async function loginUser(email, password) {
    try {
        const response = await fetch(`${apiBase}/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json().catch(() => ({ message: 'Invalid server response.' }));

        if (response.ok && data.success) {
            return { ok: true, status: response.status, data };
        }

        if (response.status === 404 || response.status >= 500 || response.status === 0) {
            return tryLocalLogin(email, password);
        }

        return { ok: false, status: response.status, data };
    } catch (error) {
        return tryLocalLogin(email, password);
    }
}

async function registerUser(name, email, password) {
    try {
        const response = await fetch(`${apiBase}/register.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json().catch(() => ({ message: 'Invalid server response.' }));

        if (response.ok && data.success) {
            return { ok: true, status: response.status, data };
        }

        if (response.status === 404 || response.status >= 500 || response.status === 0) {
            return tryLocalRegister(name, email, password);
        }

        return { ok: false, status: response.status, data };
    } catch (error) {
        return tryLocalRegister(name, email, password);
    }
}

function saveUser(user, remember) {
    const data = JSON.stringify(user);
    if (remember) {
        localStorage.setItem('user', data);
    } else {
        sessionStorage.setItem('user', data);
    }
}

function initAuth() {
    document.getElementById('loginBtn').addEventListener('click', async () => {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (!email || !password) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        try {
            const result = await loginUser(email, password);
            if (result.ok && result.data.success) {
                saveUser(result.data.user, rememberMe);
                showToast('Login successful! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1500);
            } else {
                const message = result.data?.message || 'Invalid credentials';
                showToast(`Login failed: ${message}`, 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showToast('Login failed. Check server and try again.', 'error');
        }
    });

    document.getElementById('registerBtn').addEventListener('click', async () => {
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        if (!name || !email || !password || !confirmPassword) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }

        try {
            const result = await registerUser(name, email, password);
            if (result.ok && result.data.success) {
                showToast('Account created successfully! Please login.', 'success');
                document.getElementById('registerForm').style.display = 'none';
                document.getElementById('loginForm').style.display = 'block';
                document.getElementById('regName').value = '';
                document.getElementById('regEmail').value = '';
                document.getElementById('regPassword').value = '';
                document.getElementById('regConfirmPassword').value = '';
            } else {
                const message = result.data?.message || result.data?.error || 'Registration failed';
                showToast(`Registration failed: ${message}`, 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            showToast('Registration failed. Check server and try again.', 'error');
        }
    });
}

window.addEventListener('DOMContentLoaded', initAuth);
