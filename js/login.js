document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;


    try {
        const response = await fetch('https://localhost:7157/api/User', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password })
        });
                
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('username', data.user.name);
            const newClientId = crypto.randomUUID();
            localStorage.setItem('clientId', newClientId);
            window.location.href = 'index.html';
        } else {
            document.getElementById('loginError').textContent = 'Invalid email or password.';
        }
    } catch (err) {
        document.getElementById('loginError').textContent = 'Login failed. Please try again.';
    }
});
