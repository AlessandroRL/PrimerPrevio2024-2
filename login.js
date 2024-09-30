document.getElementById('login-btn').addEventListener('click', login);

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    loginError.style.display = 'none';

    if (username === 'mor_2314' && password === '83r5^_') {
        window.location.href = 'productos.html';
    } else {
        loginError.textContent = 'Usuario o contraseña incorrectos.';
        loginError.style.display = 'block';
    }
}
