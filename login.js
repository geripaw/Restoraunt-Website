document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer (robust)
    var yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Initialize user storage
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Notification function (fixed above navbar)
    function showAlert(message, type = 'success') {
        const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show fixed-top" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        const alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = alertHTML;
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            const alerts = document.querySelectorAll('.alert');
            alerts.forEach(alert => {
                new bootstrap.Alert(alert).close();
            });
        }, 3000);
    }

    // Registration form handler
    document.getElementById('registerForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        // Save user and redirect
        const newUser = { name, email, password };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = 'profile.html';
    });

    // Login form handler
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        // Save user and redirect
        const user = { name: email, email, password };
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'profile.html';
    });

    // Check auth status on page load
    if (localStorage.getItem('currentUser')) {
        document.querySelectorAll('.login-btn').forEach(btn => {
            btn.style.display = 'none';
        });
    }
});