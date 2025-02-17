document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const profileSection = document.getElementById('profileSection');
    const authButtons = document.getElementById('authButtons');
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
        // Show profile section and hide auth buttons
        profileSection.classList.remove('hidden');
        authButtons.classList.add('hidden');
        
        // Update profile information immediately from localStorage
        document.getElementById('username').textContent = user.username;
        document.getElementById('dropdownUsername').textContent = user.username;
        document.getElementById('userEmail').textContent = user.email;
    }

    // Toggle profile dropdown
    profileBtn?.addEventListener('click', () => {
        profileDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileBtn?.contains(e.target) && !profileDropdown?.contains(e.target)) {
            profileDropdown?.classList.remove('active');
        }
    });

    // Logout functionality
    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    });

    // Navigation toggle
    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Theme toggle
    let isDark = true;
    themeToggle?.addEventListener('click', () => {
        isDark = !isDark;
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Active link highlighting
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
});
