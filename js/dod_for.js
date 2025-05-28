document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').onsubmit = function(e) {
        e.preventDefault();
        let valid = true;

        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailValue = email.value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Reset error display first
        email.style.outline = '';
        emailError.style.display = 'none';

        // Email required
        if (!emailValue) {
            email.style.outline = '2px solid red';
            emailError.textContent = 'E-mail required.';
            emailError.style.display = 'block';
            valid = false;
        } else if (!emailPattern.test(emailValue)) {
            email.style.outline = '2px solid red';
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
            valid = false;
        }

        // If valid, you can proceed with your logic here
        if (valid) {
            // e.g., send reset email, show success message, etc.
        }
    };

    document.getElementById('email').addEventListener('input', function() {
        this.style.outline = '';
        document.getElementById('emailError').style.display = 'none';
    });
});
