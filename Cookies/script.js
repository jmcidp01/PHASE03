// Lista de productos predefinida [cite: 6]
const products = [
    { id: 1, name: 'Camiseta', price: 20 },
    { id: 2, name: 'Pantalones', price: 40 },
    { id: 3, name: 'Zapatos', price: 60 },
    { id: 4, name: 'Gorra', price: 15 }
];

// Estado del carrito
let cart = [];

// Inicialización al cargar la página [cite: 46]
window.onload = () => {
    renderProductList();
    loadCart(); // Carga carrito y tema desde cookies
};

// Renderizar lista de productos en el HTML
function renderProductList() {
    const container = document.getElementById('products-container');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})" style="background-color: #007bff; color: white;">Agregar</button>
        `;
        container.appendChild(card);
    });
}

// [cite: 42] Función: Añadir producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    // [cite: 61] Mensaje de confirmación
    alert(`¡${product.name} agregado al carrito!`);
}

// [cite: 10, 11] Función: Eliminar producto
function removeFromCart(productId) {
    if(confirm("¿Estás seguro de eliminar este producto?")) { // [cite: 61]
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
}

// [cite: 8, 9] Función: Actualizar cantidad (input directo)
function updateQuantity(productId, newQuantity) {
    const qty = parseInt(newQuantity);
    // [cite: 63] Validación: asegurar cantidades positivas
    if (qty > 0) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = qty;
            updateCart();
        }
    } else {
        alert("La cantidad debe ser mayor a 0");
        updateCart(); // Revertir vista
    }
}

// [cite: 43] Función: Actualizar visualización del carrito y guardar cookies
function updateCart() {
    const tbody = document.getElementById('cart-body');
    const totalEl = document.getElementById('cart-total');
    tbody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>
                <input type="number" min="1" value="${item.quantity}" 
                       onchange="updateQuantity(${item.id}, this.value)">
            </td>
            <td>$${subtotal}</td>
            <td>
                <button onclick="removeFromCart(${item.id})" class="btn-danger">X</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    totalEl.innerText = total.toFixed(2);
    saveCart(); // [cite: 66] Refrescar cookies automáticamente
}

// [cite: 44] Función: Cambiar tema y guardar preferencia
function changeTheme(theme) {
    document.body.className = `theme-${theme}`;
    // [cite: 55] Guardar tema en cookie
    document.cookie = `theme=${theme}; path=/; max-age=31536000`; 
    // [cite: 61] Confirmación opcional (puede ser molesta, pero el doc la sugiere)
    console.log(`Tema cambiado a ${theme}`);
}

// [cite: 45, 54] Función: Guardar carrito en cookies
function saveCart() {
    // Se usa encodeURIComponent y JSON.stringify como pide el doc
    const cartJSON = encodeURIComponent(JSON.stringify(cart));
    document.cookie = `cart=${cartJSON}; path=/; max-age=604800`; // Expira en 7 días
}

// [cite: 46] Función: Cargar carrito y tema desde cookies
function loadCart() {
    const cookies = document.cookie.split(';');
    
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        
        if (name === 'cart' && value) {
            try {
                cart = JSON.parse(decodeURIComponent(value));
                updateCart(); // Refrescar visualización sin guardar de nuevo
            } catch (e) {
                console.error("Error al cargar el carrito", e);
            }
        }
        
        if (name === 'theme' && value) {
            document.body.className = `theme-${value}`;
        }
    });
}

// [cite: 86] Función: Vaciar carrito
function clearCart() {
    if(confirm("¿Vaciar todo el carrito?")) {
        cart = [];
        updateCart();
    }
}

// [cite: 88] Función: Checkout (simulación)
function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert(`Gracias por tu compra. Total: $${document.getElementById('cart-total').innerText}`);
    cart = [];
    updateCart();
}