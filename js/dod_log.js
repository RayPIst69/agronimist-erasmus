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