document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    let valid = true;

    // Reset
    username.style.outline = '';
    password.style.outline = '';
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';

    if (!username.value.trim()) {
        username.style.outline = '2px solid red';
        usernameError.style.display = 'block';
        valid = false;
    }
    if (!password.value.trim()) {
        password.style.outline = '2px solid red';
        passwordError.style.display = 'block';
        valid = false;
    }
    if (!valid) return;

    // Continue with login logic here
    alert('Login successful (demo)');
};

// Hide error and outline when user types
document.getElementById('username').addEventListener('input', function() {
    this.style.outline = '';
    document.getElementById('usernameError').style.display = 'none';
});
document.getElementById('password').addEventListener('input', function() {
    this.style.outline = '';
    document.getElementById('passwordError').style.display = 'none';
});

document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    let valid = true;

    // Reset
    username.style.outline = '';
    password.style.outline = '';
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';

    // Username required and min length
    if (!username.value.trim()) {
        username.style.outline = '2px solid red';
        usernameError.textContent = 'Username is required.';
        usernameError.style.display = 'block';
        valid = false;
    } else if (username.value.trim().length < 3) {
        username.style.outline = '2px solid red';
        usernameError.textContent = 'Username must be at least 3 characters.';
        usernameError.style.display = 'block';
        valid = false;
    }

    // Password required
    if (!password.value.trim()) {
        password.style.outline = '2px solid red';
        passwordError.textContent = 'Password is required.';
        passwordError.style.display = 'block';
        valid = false;
    }
    if (!valid) return;

    // Continue with login logic here
    alert('Login successful (demo)');
};

// Hide error and outline when user types
document.getElementById('username').addEventListener('input', function(e) {
    // Remove invalid characters as the user types
    const filtered = this.value.replace(/[^a-zA-Z0-9_-]/g, '');
    const usernameError = document.getElementById('usernameError');
    if (this.value !== filtered) {
        this.value = filtered;
        usernameError.textContent = 'Only letters, numbers, underscores, and dashes are allowed.';
        usernameError.style.display = 'block';
    } else if (filtered.length > 0 && filtered.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters.';
        usernameError.style.display = 'block';
    } else {
        usernameError.style.display = 'none';
    }
    this.style.outline = '';
});

document.getElementById('password').addEventListener('input', function() {
    this.style.outline = '';
    const passwordError = document.getElementById('passwordError');
    passwordError.style.display = 'none';
});
// Load comments on page load
window.addEventListener('DOMContentLoaded', loadComments);