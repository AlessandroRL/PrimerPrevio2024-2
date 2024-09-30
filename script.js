function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        username: 'mor_2314',
        password: '83r5^_'
    };

    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            alert('Login exitoso');
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('product-section').style.display = 'block';
            fetchCategories();
            fetchProducts();
        } else {
            alert('Error en el login');
        }
    });
}

function fetchCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            const categoryFilter = document.getElementById('categoryFilter');
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
            productList.innerHTML = '';
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

function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    fetchProducts(category);
}

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

function showCart() {
    document.getElementById('product-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'block';

    fetch('https://fakestoreapi.com/carts/user/2')
        .then(res => res.json())
        .then(cart => {
            const cartDetails = document.getElementById('cart-details');
            cartDetails.innerHTML = '';
            cart.forEach(item => {
                cartDetails.innerHTML += `<p>Producto ID: ${item.id} - Cantidad: ${item.quantity}</p>`;
            });
        });
}