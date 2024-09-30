function fetchCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            const categoryFilter = document.getElementById('categoryFilter');
            categoryFilter.innerHTML = '<option value="">Todas las Categorías</option>';
            categories.forEach(category => {
                let option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
        });
}

function fetchProducts(category = '') {
    let url = 'https://fakestoreapi.com/products';
    if (category) {
        url += `/category/${category}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Limpiar la lista de productos
            products.forEach(product => {
                let div = document.createElement('div');
                div.className = 'product-item';
                div.innerHTML = `
                    <h3>${product.title}</h3>
                    <img src="${product.image}" alt="${product.title}" width="100">
                    <p>${product.description}</p>
                    <p><strong>$${product.price}</strong></p>
                    <button onclick="addToCart(${product.id})">Agregar al carrito</button>
                `;
                productList.appendChild(div);
            });
        });
}

document.getElementById('categoryFilter').addEventListener('change', () => {
    const category = document.getElementById('categoryFilter').value;
    fetchProducts(category);
});

fetchCategories();
fetchProducts();

function addToCart(productId) {
    fetch(`https://fakestoreapi.com/carts`, {
        method: "POST",
        body: JSON.stringify({
            userId: 2,
            date: new Date(),
            products: [{ productId: productId, quantity: 1 }]
        })
    })
    .then(res => res.json())
    .then(json => alert('Producto agregado al carrito'));
}

document.getElementById('cart-btn').addEventListener('click', showCart);
document.getElementById('logout-btn').addEventListener('click', () => {
    window.location.href = 'login.html';
});

function showCart() {
    document.getElementById('product-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'block';
    fetchCartItems();
}

function goToProducts() {
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('product-section').style.display = 'block';
}

function fetchCartItems() {
    fetch('https://fakestoreapi.com/carts/user/2')
        .then(res => res.json())
        .then(cart => {
            const cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = ''; // Reset cart items
            cart.forEach(item => {
                cartItems.innerHTML += `<p>Producto ID: ${item.id} - Cantidad: ${item.quantity}</p>`;
            });
        });
}

fetchCategories();
fetchProducts();

document.getElementById('cart-btn').addEventListener('click', () => {
    window.location.href = 'carrito.html';
});

document.getElementById('logout-btn').addEventListener('click', () => {
    window.location.href = 'login.html';
});

fetchCategories();
fetchProducts();
