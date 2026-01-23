// js/main.js
import { products, getCart, updateQuantity, clearCart, applyDiscountCode, getDiscount, registerUser, loginUser, logoutUser, getCurrentUser, processCheckout } from './core.js';

let authMode = 'login';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Listeners Búsqueda Avanzada
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', handleSearchInput); // Filtrar grid
    searchInput.addEventListener('input', handleSearchSuggestions); // Mostrar dropdown
    searchInput.addEventListener('focus', handleSearchSuggestions); // Mostrar al hacer click
    
    // Cerrar sugerencias al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            document.getElementById('suggestions-box').classList.remove('active');
        }
    });

    // 2. Listeners Header & Auth
    document.getElementById('btn-header-login').addEventListener('click', toggleLoginModal);
    document.getElementById('btn-close-modal').addEventListener('click', toggleLoginModal);
    document.getElementById('btn-auth-submit').addEventListener('click', handleAuthSubmit);
    document.getElementById('tab-login').addEventListener('click', () => switchAuthMode('login'));
    document.getElementById('tab-register').addEventListener('click', () => switchAuthMode('register'));

    // 3. Listeners Sidebar
    document.getElementById('btn-apply-coupon').addEventListener('click', handleCoupon);
    document.getElementById('btn-clear-cart').addEventListener('click', handleClearCart);
    document.getElementById('btn-checkout').addEventListener('click', handleCheckout);

    // 4. Delegación Eventos
    document.getElementById('product-list').addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        if (btn.dataset.action === 'add' || btn.dataset.action === 'modify') {
            handleModifyCart(btn.dataset.id, parseInt(btn.dataset.qty));
        }
        if (btn.dataset.action === 'lock') toggleLoginModal();
    });

    document.getElementById('cart-items-container').addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        if (btn.dataset.action === 'modify') {
            handleModifyCart(btn.dataset.id, parseInt(btn.dataset.qty));
        }
    });

    // Delegación para clicks en SUGERENCIAS
    document.getElementById('suggestions-box').addEventListener('click', (e) => {
        const item = e.target.closest('.suggestion-item');
        if (item) {
            const productName = item.dataset.name;
            // Ponemos el nombre en el buscador
            document.getElementById('search-input').value = productName;
            // Filtramos el grid
            renderProductList(productName);
            // Cerramos caja
            document.getElementById('suggestions-box').classList.remove('active');
        }
    });

    renderApp();
});

// --- LÓGICA DE BÚSQUEDA Y SUGERENCIAS ---
function handleSearchInput(e) {
    renderProductList(e.target.value);
}

function handleSearchSuggestions(e) {
    const val = e.target.value.toLowerCase();
    const box = document.getElementById('suggestions-box');
    
    if (val.length < 2) {
        box.classList.remove('active');
        return;
    }

    // Buscar coincidencias (Máximo 6 para no saturar)
    const matches = products.filter(p => p.name.toLowerCase().includes(val)).slice(0, 6);

    if (matches.length > 0) {
        box.innerHTML = matches.map(p => {
            const stockMsg = p.stock === 0 ? '<span class="s-stock-warning">AGOTADO</span>' : '';
            return `
                <div class="suggestion-item" data-name="${p.name}">
                    <span class="s-name">${p.name}</span>
                    <div>
                        ${stockMsg}
                        <span class="s-price">${p.price}€</span>
                    </div>
                </div>
            `;
        }).join('');
        box.classList.add('active');
    } else {
        box.classList.remove('active');
    }
}


// --- RENDERIZADO GENERAL ---
function renderApp() {
    const user = getCurrentUser();
    const searchVal = document.getElementById('search-input').value;
    renderProductList(searchVal);
    renderSidebar();
    updateHeaderUI(user);
}

function renderProductList(filterText = '') {
    const container = document.getElementById('product-list');
    const cart = getCart();
    const user = getCurrentUser();
    
    const filtered = products.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));
    
    if (filtered.length === 0) {
        container.innerHTML = '<h3 class="no-results">NO SE ENCONTRARON PIEZAS</h3>';
        return;
    }

    container.innerHTML = filtered.map(prod => {
        const inCart = cart.find(item => item.id === prod.id);
        const cartQty = inCart ? inCart.quantity : 0;
        const remainingStock = prod.stock - cartQty;
        const isSoldOut = remainingStock <= 0;

        let btnHTML;
        let badgeHTML = `<span class="stock-badge ${prod.stock < 5 ? 'low-stock' : ''}">STOCK: ${remainingStock}</span>`;

        if (!user) {
            btnHTML = `<button data-action="lock" class="btn-add-initial btn-locked">🔒 INICIA SESIÓN</button>`;
            badgeHTML = ''; 
        } else if (isSoldOut) {
            btnHTML = `<button disabled class="btn-add-initial btn-sold-out">🚫 AGOTADO</button>`;
            badgeHTML = `<span class="stock-badge no-stock">SIN STOCK</span>`;
        } else if (cartQty === 0) {
            btnHTML = `<button data-action="add" data-id="${prod.id}" data-qty="1" class="btn-add-initial">AÑADIR</button>`;
        } else {
            btnHTML = `
               <div class="quantity-controls">
                 <button data-action="modify" data-id="${prod.id}" data-qty="-1" class="btn-qty btn-minus">-</button>
                 <span class="qty-display">${cartQty}</span>
                 <button data-action="modify" data-id="${prod.id}" data-qty="1" class="btn-qty btn-plus" ${remainingStock === 0 ? 'disabled' : ''}>+</button>
               </div>`;
        }

        return `
            <div class="product-card ${isSoldOut && user ? 'card-sold-out' : ''}">
                <div class="img-container">
                    ${badgeHTML}
                    <img src="${prod.image}" alt="${prod.name}" loading="lazy" class="product-img" onerror="this.src='https://placehold.co/400x250/111/FFF?text=IMAGEN+NO+DISPONIBLE'">
                </div>
                <div class="card-content">
                    <h3>${prod.name}</h3>
                    <span class="price">${prod.price}€</span>
                    <div class="card-actions">${btnHTML}</div>
                </div>
            </div>
        `;
    }).join('');
}

function renderSidebar() {
    const container = document.getElementById('cart-items-container');
    const cart = getCart();
    const discountRate = getDiscount();
    const user = getCurrentUser();

    if (!user) {
        container.innerHTML = '<div class="empty-cart-msg">ACCESO RESTRINGIDO</div>';
        updateTotals(0, 0, 0);
        return;
    }

    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart-msg">GARAJE VACÍO</div>';
        updateTotals(0, 0, 0);
        return;
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discountAmount = subtotal * discountRate;
    const finalTotal = subtotal - discountAmount;
    
    updateTotals(finalTotal, discountAmount, cart.reduce((a, c) => a + c.quantity, 0));

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" class="cart-thumb" onerror="this.src='https://placehold.co/50x50/333/FFF?text=X'">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.quantity} x ${item.price}€</p>
            </div>
            <div class="mini-controls">
                 <button data-action="modify" data-id="${item.id}" data-qty="-1" class="btn-mini">-</button>
                 <button data-action="modify" data-id="${item.id}" data-qty="1" class="btn-mini">+</button>
            </div>
        </div>
    `).join('');
}

function updateTotals(total, discount, count) {
    document.getElementById('cart-total').innerText = `${total.toFixed(2)}€`;
    document.getElementById('item-count-badge').innerText = `${count}`;
    const discRow = document.getElementById('discount-row');
    discRow.style.display = discount > 0 ? 'flex' : 'none';
    if (discount > 0) document.getElementById('discount-amount').innerText = `-${discount.toFixed(2)}€`;
}

// HANDLERS
function handleModifyCart(id, qty) {
    const result = updateQuantity(id, qty);
    if (result.success) {
        renderApp();
    } else {
        if (result.error === "AUTH_REQUIRED") toggleLoginModal();
        if (result.error === "MAX_STOCK") alert(`¡STOCK MÁXIMO ALCANZADO!`);
    }
}

function handleClearCart() { if (confirm("¿Vaciar garaje?")) { clearCart(); renderApp(); } }

// --- CHECKOUT REAL (REDUCE STOCK) ---
function handleCheckout() {
    if (!getCurrentUser()) return alert("Inicia sesión.");
    if (getCart().length === 0) return alert("Carrito vacío.");
    
    if (confirm("¿Confirmar compra y procesar pago?")) {
        // Llamada a la nueva función de Core
        const success = processCheckout();
        if (success) {
            alert(`¡COMPRA REALIZADA CON ÉXITO!\nEl inventario ha sido actualizado.`);
            renderApp(); // Redibuja todo con los nuevos stocks (algunos podrían quedar agotados)
        }
    }
}

function handleCoupon() {
    const code = document.getElementById('coupon-input').value;
    alert(applyDiscountCode(code) ? "Código Aplicado!" : "Código Inválido");
    renderApp();
}

// AUTH HANDLERS (Iguales que antes)
function updateHeaderUI(user) {
    const btn = document.getElementById('btn-header-login');
    if (user) {
        btn.innerText = `PILOTO: ${user.toUpperCase()} (SALIR)`;
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', () => { if(confirm("¿Salir?")) { logoutUser(); renderApp(); } });
        newBtn.classList.add('logged-in');
    } else {
        btn.innerText = `INICIAR SESIÓN`;
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', toggleLoginModal);
        newBtn.classList.remove('logged-in');
    }
}

function toggleLoginModal() {
    document.getElementById('login-modal').classList.toggle('active');
    document.getElementById('auth-user').value = '';
    document.getElementById('auth-pass').value = '';
}

function switchAuthMode(mode) {
    authMode = mode;
    document.getElementById('tab-login').classList.toggle('active', mode === 'login');
    document.getElementById('tab-register').classList.toggle('active', mode === 'register');
    document.getElementById('modal-title').innerText = mode === 'login' ? "ACCESO CLIENTE" : "REGISTRO PILOTO";
    document.getElementById('btn-auth-submit').innerText = mode === 'login' ? "CONECTAR" : "CREAR CUENTA";
}

function handleAuthSubmit() {
    const user = document.getElementById('auth-user').value;
    const pass = document.getElementById('auth-pass').value;
    if (!user || !pass) return alert("Datos incompletos");

    if (authMode === 'login') {
        const res = loginUser(user, pass);
        if (res.success) { toggleLoginModal(); renderApp(); }
        else alert(res.msg);
    } else {
        const res = registerUser(user, pass);
        alert(res.msg);
        if (res.success) switchAuthMode('login');
    }
}