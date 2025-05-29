document.addEventListener('DOMContentLoaded', function() {
    // Always hide code error on page load
    document.getElementById('codeError').style.display = 'none';

    // --- Code box logic: only digits, auto-advance, hide error on input ---
    document.querySelectorAll('.code-box').forEach((box, idx, arr) => {
        box.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, ''); // Only digits
            if (this.value && idx < arr.length - 1) {
                arr[idx + 1].focus();
            }
            document.getElementById('codeError').style.display = 'none';
        });
        box.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && idx > 0) {
                arr[idx - 1].focus();
            }
        });
    });

    // --- Timer logic with persistence ---
    const TIMER_KEY = 'reset-timer-end';
    const TIMER_DURATION = 60; // seconds

    const timerDiv = document.getElementById('timer');
    const timeoutMsg = document.getElementById('timeoutMsg');

    // Get or set the timer end time
    let endTime = localStorage.getItem(TIMER_KEY);
    if (!endTime || isNaN(Number(endTime)) || Number(endTime) < Date.now()) {
        endTime = Date.now() + TIMER_DURATION * 1000;
        localStorage.setItem(TIMER_KEY, endTime);
    } else {
        endTime = Number(endTime);
    }

    function updateTimer() {
        let timeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;
        timerDiv.textContent = `Time left: ${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        return timeLeft;
    }

    updateTimer();
    const timerInterval = setInterval(function() {
        let timeLeft = updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDiv.style.display = 'none';
            timeoutMsg.style.display = 'block';
            localStorage.removeItem(TIMER_KEY); // Clear timer for next time
            setTimeout(function() {
                window.location.href = 'forgor.html';
            }, 2000); // Show message for 2 seconds before redirect
        }
    }, 1000);

    // --- Form validation ---
    document.getElementById('loginForm').onsubmit = function(e) {
        e.preventDefault();
        let valid = true;

        // --- Code box validation ---
        const codeBoxes = document.querySelectorAll('.code-box');
        const codeError = document.getElementById('codeError');
        let codeFilled = true;
        codeBoxes.forEach(box => {
            if (!box.value.match(/^[0-9]$/)) codeFilled = false;
        });
        codeError.style.display = 'none';
        if (!codeFilled) {
            codeError.style.display = 'block';
            valid = false;
        }

        // --- Password validation ---
        const password = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        const passwordValue = password.value.trim();
        const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        password.style.outline = '';
        passwordError.style.display = 'none';

        if (!passwordValue) {
            password.style.outline = '2px solid red';
            passwordError.textContent = 'Password required.';
            passwordError.style.display = 'block';
            valid = false;
        } else if (!strongPasswordPattern.test(passwordValue)) {
            password.style.outline = '2px solid red';
            passwordError.textContent = 'Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character.';
            passwordError.style.display = 'block';
            valid = false;
        }

        if (valid) {
            // Success logic here (e.g., submit form, redirect, etc.)
            localStorage.removeItem(TIMER_KEY); // Clear timer on success
        }
    };

    // Hide password error on input
    document.getElementById('password').addEventListener('input', function() {
        this.style.outline = '';
        document.getElementById('passwordError').style.display = 'none';
    });

    // Eye/monkey toggle for password visibility
    document.getElementById('togglePassword').addEventListener('click', function() {
        const pwd = document.getElementById('password');
        if (pwd.type === 'password') {
            pwd.type = 'text';
            this.textContent = '🙈';
        } else {
            pwd.type = 'password';
            this.textContent = '👁️';
        }
    });
});