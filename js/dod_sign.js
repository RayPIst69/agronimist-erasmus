document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    let valid = true;

    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passcheck = document.getElementById('passcheck');

    const firstnameError = document.getElementById('firstnameError');
    const lastnameError = document.getElementById('lastnameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const passcheckError = document.getElementById('passcheckError');
    const emailValue = email.value.trim();
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailValue)) {
        email.style.outline = '2px solid red';
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        valid = false;
    }

    // Reset all errors
    [firstname, lastname, email, password, passcheck].forEach(input => input.style.outline = '');
    [firstnameError, lastnameError, emailError, passwordError, passcheckError].forEach(span => span.style.display = 'none');

    // First name required
    if (!firstname.value.trim()) {
        firstname.style.outline = '2px solid red';
        firstnameError.textContent = 'First name required.';
        firstnameError.style.display = 'block';
        valid = false;
    }
    // Last name required
    if (!lastname.value.trim()) {
        lastname.style.outline = '2px solid red';
        lastnameError.textContent = 'Last name required.';
        lastnameError.style.display = 'block';
        valid = false;
    }
    // Email required
    if (!email.value.trim()) {
        email.style.outline = '2px solid red';
        emailError.textContent = 'E-mail required.';
        emailError.style.display = 'block';
        valid = false;
    }
    // Password required
    if (!password.value.trim()) {
        password.style.outline = '2px solid red';
        passwordError.textContent = 'Password required.';
        passwordError.style.display = 'block';
        valid = false;
    }
    // Password strength: at least 1 lowercase, 1 uppercase, 1 number, 1 special character, min 8 chars
    const passwordValue = password.value.trim();
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (passwordValue && !strongPasswordPattern.test(passwordValue)) {
        password.style.outline = '2px solid red';
        passwordError.textContent = 'Please include all required symbols.';
        passwordError.style.display = 'block';
        valid = false;
    }
    // Password check required
    if (!passcheck.value.trim()) {
        passcheck.style.outline = '2px solid red';
        passcheckError.textContent = 'Please repeat your password.';
        passcheckError.style.display = 'block';
        valid = false;
    }
    // Passwords must match
    if (passcheck.value.trim() && passcheck.value.trim() !== password.value.trim()) {
        passcheck.style.outline = '2px solid red';
        passcheckError.textContent = 'Passwords do not match.';
        passcheckError.style.display = 'block';
        valid = false;
    }

    if (!valid) return;

    // Continue with sign-up logic here
    alert('Sign up successful (demo)');
};

// Hide error and outline when user types
document.getElementById('firstname').addEventListener('input', function() {
    this.style.outline = '';
    document.getElementById('firstnameError').style.display = 'none';
});
document.getElementById('lastname').addEventListener('input', function() {
    this.style.outline = '';
    document.getElementById('lastnameError').style.display = 'none';
});
document.getElementById('email').addEventListener('input', function() {
    this.style.outline = '';
    document.getElementById('emailError').style.display = 'none';
});
document.getElementById('password').addEventListener('input', function() {
    this.style.outline = '';
    document.getElementById('passwordError').style.display = 'none';
});
document.getElementById('passcheck').addEventListener('input', function() {
    this.style.outline = '';
    document.getElementById('passcheckError').style.display = 'none';
});

document.getElementById('togglePassword').addEventListener('click', function() {
    const pwd = document.getElementById('password');
    if (pwd.type === 'password') {
        pwd.type = 'text';
        this.textContent = '🙈'; // Change icon if you want
    } else {
        pwd.type = 'password';
        this.textContent = '👁️';
    }
});

document.getElementById('firstname').addEventListener('input', function() {
    this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s\-]/g, '');
});
document.getElementById('lastname').addEventListener('input', function() {
    this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s\-]/g, '');
});
