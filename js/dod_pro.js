document.addEventListener('DOMContentLoaded', function() {
    // --- Profile picture upload logic ---
    const profilePic = document.getElementById('profilePic');
    const profileUpload = document.getElementById('profileUpload');
    const editBtn = document.getElementById('editProfilePic');

    editBtn.addEventListener('click', function() {
        profileUpload.click();
    });

    profileUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
                localStorage.setItem('profilePic', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved profile picture if available
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
        profilePic.src = savedPic;
    }

    // --- Input filtering for first and last name ---
    document.getElementById('firstNameInput').addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z\s-]/g, '');
    });
    document.getElementById('lastNameInput').addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z\s-]/g, '');
    });

    // --- Profile info fields logic ---
    const fields = ['firstName', 'lastName', 'username', 'email', 'password', 'created'];
    fields.forEach(function(field) {
        const valueSpan = document.getElementById(field + 'Value');
        const saved = localStorage.getItem('profile' + field.charAt(0).toUpperCase() + field.slice(1));
        if (saved && valueSpan) {
            // For password, show as stars
            if (field === 'password') {
                valueSpan.textContent = '********';
            } else {
                valueSpan.textContent = saved;
            }
        }
    });

    // Set account creation date if not set
    if (!localStorage.getItem('profileCreated')) {
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem('profileCreated', today);
        const createdValue = document.getElementById('createdValue');
        if (createdValue) createdValue.textContent = today;
    } else {
        const createdValue = document.getElementById('createdValue');
        if (createdValue) createdValue.textContent = localStorage.getItem('profileCreated');
    }

    // --- Edit/save logic for all editable fields except "created" ---
    document.querySelectorAll('.edit-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const field = btn.getAttribute('data-field');
            document.getElementById(field + 'Value').style.display = 'none';
            const input = document.getElementById(field + 'Input');
            input.style.display = 'inline-block';
            btn.style.display = 'none';
            document.querySelector('.save-btn[data-field="' + field + '"]').style.display = 'inline-block';
            // Set input value to current value (for password, don't show stars)
            if (field === 'password') {
                input.value = localStorage.getItem('profilePassword') || '';
            } else {
                input.value = document.getElementById(field + 'Value').textContent;
            }
        });
    });

    document.querySelectorAll('.save-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const field = btn.getAttribute('data-field');
            const input = document.getElementById(field + 'Input');
            const valueSpan = document.getElementById(field + 'Value');
            let displayValue = input.value;

            // --- Min/max and validation ---
            if (field === 'firstName' && (input.value.length < 2 || input.value.length > 32)) {
                alert('First name must be between 2 and 32 characters.');
                return;
            }
            if (field === 'lastName' && (input.value.length < 2 || input.value.length > 32)) {
                alert('Last name must be between 2 and 32 characters.');
                return;
            }
            if (field === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    alert('Please enter a valid email address.');
                    return;
                }
            }
            if (field === 'password') {
                displayValue = '********';
            }

            valueSpan.textContent = displayValue;
            valueSpan.style.display = 'inline-block';
            input.style.display = 'none';
            btn.style.display = 'none';
            document.querySelector('.edit-btn[data-field="' + field + '"]').style.display = 'inline-block';
            // Save to localStorage (for password, save real value)
            localStorage.setItem('profile' + field.charAt(0).toUpperCase() + field.slice(1), input.value);
        });
    });

    // --- Logout and Delete Account buttons ---
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'login.html';
    });

    document.getElementById('deleteAccountBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
            localStorage.clear();
            window.location.href = 'signup.html';
        }
    });
});