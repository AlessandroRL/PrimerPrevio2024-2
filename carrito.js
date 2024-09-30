document.getElementById('back-to-products').addEventListener('click', () => {
    window.location.href = 'productos.html';
});

function goToProducts() {
    window.location.href = 'productos.html';
}

function fetchCartItems() {
    fetch('https://fakestoreapi.com/carts/user/2')
        .then(res => res.json())
        .then(cart => {
            const cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = '';

            cart.forEach(order => {
                const date = new Date(order.date).toLocaleDateString();
                const row = `
                    <tr>
                        <td>${order.products.length}</td>
                        <td>${date}</td>
                        <td><button onclick="viewOrder(${order.id})">Ver</button></td>
                    </tr>
                `;
                cartItems.innerHTML += row;
            });
        });
}

function viewOrder(orderId) {
    alert('Mostrando detalles del pedido ' + orderId);
}

fetchCartItems();


