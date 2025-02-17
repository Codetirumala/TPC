document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');

    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    };

    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(signinForm);
            const data = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('user', JSON.stringify({
                        username: result.user.username,
                        email: result.user.email
                    }));
                    window.location.href = '/';
                } else {
                    showError(result.message || 'Sign in failed');
                }
            } catch (error) {
                console.error('Error:', error);
                showError('An error occurred during sign in');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(signupForm);
            const password = formData.get('password');
            const confirmPassword = formData.get('confirm-password');

            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }

            const data = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: password
            };

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('user', JSON.stringify({
                        username: result.user.username,
                        email: result.user.email
                    }));
                    window.location.href = '/';
                } else {
                    showError(result.message || 'Sign up failed');
                }
            } catch (error) {
                console.error('Error:', error);
                showError('An error occurred during sign up');
            }
        });
    }
}); 