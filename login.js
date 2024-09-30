document.getElementById('login-btn').addEventListener('click', login);

// Función de login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    // Ocultar el mensaje de error por defecto
    loginError.style.display = 'none';

    // Validación local del usuario y contraseña
    if (username === 'mor_2314' && password === '83r5^_') {
        // Si el login es exitoso, redirigir a la página de productos
        window.location.href = 'productos.html';
    } else {
        // Mostrar mensaje de error si las credenciales no son correctas
        loginError.textContent = 'Usuario o contraseña incorrectos.';
        loginError.style.display = 'block';
    }
}