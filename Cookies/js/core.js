// js/core.js

// --- 1. CONFIGURACIÓN DE IMÁGENES ---
const partImages = {
    "Exhaust": "https://loremflickr.com/400/250/exhaust,car?lock=1",
    "Intake": "https://loremflickr.com/400/250/engine,filter?lock=2",
    "Turbo": "https://loremflickr.com/400/250/turbocharger?lock=3",
    "Suspension": "https://loremflickr.com/400/250/suspension,car?lock=4",
    "Brakes": "https://loremflickr.com/400/250/brake,caliper?lock=5",
    "Wheels": "https://loremflickr.com/400/250/alloy,wheel?lock=6",
    "Spoiler": "https://loremflickr.com/400/250/spoiler,car?lock=7",
    "Intercooler": "https://loremflickr.com/400/250/intercooler?lock=8",
    "ECU": "https://loremflickr.com/400/250/microchip,tech?lock=9",
    "Steering": "https://loremflickr.com/400/250/steering,wheel?lock=10",
    "Rollcage": "https://loremflickr.com/400/250/rollcage,racing?lock=11",
    "Injectors": "https://loremflickr.com/400/250/engine,piston?lock=12"
};

// --- 2. GESTIÓN DE PRODUCTOS PERSISTENTE ---
export let products = [];

// Función para guardar el estado actual de los productos (Stock actualizado)
function saveProductsDB() {
    localStorage.setItem('shop_inventory', JSON.stringify(products));
}

// Inicialización: ¿Tenemos inventario guardado o generamos uno nuevo?
const savedInventory = localStorage.getItem('shop_inventory');

if (savedInventory) {
    // CARGAR INVENTARIO EXISTENTE (Con stocks modificados)
    products = JSON.parse(savedInventory);
} else {
    // GENERAR INVENTARIO INICIAL (Solo la primera vez)
    const carModels = [
        "Nissan GTR R35", "Toyota Supra MK4", "BMW M4 G82", "Audi RS3 8Y", 
        "Porsche 911 GT3", "VW Golf 8 R", "Honda Civic Type R", "Subaru WRX STI", 
        "Ford Mustang GT", "Mercedes AMG A45"
    ];

    const parts = [
        { type: "Downpipe Titanium", basePrice: 650, imgKey: "Exhaust" },
        { type: "Kit Admisión Carbono", basePrice: 1200, imgKey: "Intake" },
        { type: "Turbo Híbrido Stage 2", basePrice: 2400, imgKey: "Turbo" },
        { type: "Suspensión Coilover KW", basePrice: 1800, imgKey: "Suspension" },
        { type: "Frenos Cerámicos Kit", basePrice: 4500, imgKey: "Brakes" },
        { type: "Llantas Forjadas 19\"", basePrice: 3200, imgKey: "Wheels" },
        { type: "Alerón GT Carbono", basePrice: 950, imgKey: "Spoiler" },
        { type: "Intercooler Frontal", basePrice: 800, imgKey: "Intercooler" },
        { type: "ECU Remap Stage 1", basePrice: 500, imgKey: "ECU" },
        { type: "Volante Racing LED", basePrice: 600, imgKey: "Steering" },
        { type: "Barras Antivuelco", basePrice: 750, imgKey: "Rollcage" },
        { type: "Inyectores 1000cc", basePrice: 400, imgKey: "Injectors" }
    ];

    let idCounter = 1;

    carModels.forEach((model, index) => {
        parts.forEach((part, partIndex) => {
            const randomFactor = Math.floor(Math.random() * 200); 
            const imgLock = `?lock=${index * 12 + partIndex}`;
            const baseImgUrl = partImages[part.imgKey].split('?')[0] + imgLock;
            
            // Stock aleatorio inicial (entre 1 y 8)
            const randomStock = Math.floor(Math.random() * 8) + 1;

            products.push({
                id: idCounter++,
                name: `${part.type} - ${model}`,
                price: part.basePrice + randomFactor,
                image: baseImgUrl,
                stock: randomStock
            });
            
            // Versión Race Spec
            products.push({
                id: idCounter++,
                name: `${part.type} (Race Spec) - ${model}`,
                price: part.basePrice + randomFactor + 500,
                image: baseImgUrl,
                stock: Math.floor(Math.random() * 3) + 1 // Poco stock
            });
        });
    });
    
    // Guardamos este estado inicial
    saveProductsDB();
}

// --- RESTO DE LÓGICA (USUARIOS, CARRITO) ---
const COUPONS = { 'RACING20': 0.20, 'TURBO': 0.15, 'GODMODE': 0.99 };
let cart = [];
let activeDiscount = 0;
let currentUser = null;

function getUsersDB() { return JSON.parse(localStorage.getItem('shop_users') || '{}'); }
function saveUsersDB(users) { localStorage.setItem('shop_users', JSON.stringify(users)); }

function saveCart() {
    if (!currentUser) return;
    localStorage.setItem(`cart_${currentUser}`, JSON.stringify(cart));
}
function loadCart() {
    if (!currentUser) { cart = []; return; }
    const saved = localStorage.getItem(`cart_${currentUser}`);
    cart = saved ? JSON.parse(saved) : [];
}

// Auth API
export function registerUser(username, password) {
    const db = getUsersDB();
    if (db[username]) return { success: false, msg: "Usuario ya existe." };
    db[username] = { password };
    saveUsersDB(db);
    return { success: true, msg: "Usuario registrado." };
}

export function loginUser(username, password) {
    const db = getUsersDB();
    if (db[username] && db[username].password === password) {
        currentUser = username;
        loadCart();
        return { success: true, msg: `Bienvenido ${username}` };
    }
    return { success: false, msg: "Credenciales incorrectas." };
}

export function logoutUser() {
    currentUser = null;
    cart = [];
    activeDiscount = 0;
}

export function getCurrentUser() { return currentUser; }

// Cart API
export function getCart() { return [...cart]; }
export function getDiscount() { return activeDiscount; }

export function applyDiscountCode(code) {
    if (COUPONS[code.toUpperCase()]) {
        activeDiscount = COUPONS[code.toUpperCase()];
        return true;
    }
    return false;
}

export function updateQuantity(id, change) {
    if (!currentUser) return { success: false, error: "AUTH_REQUIRED" };
    
    const productId = parseInt(id);
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(p => p.id === productId);
    const currentQty = cartItem ? cartItem.quantity : 0;

    // Validación Stock
    if (change > 0) {
        if (currentQty + change > product.stock) {
            return { success: false, error: "MAX_STOCK", max: product.stock };
        }
    }

    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) cart = cart.filter(p => p.id !== productId);
    } else if (change > 0) {
        if (product.stock > 0) cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    return { success: true };
}

export function clearCart() {
    if (!currentUser) return;
    cart = [];
    activeDiscount = 0;
    saveCart();
}

// --- NUEVA FUNCIÓN: PROCESAR COMPRA Y REDUCIR STOCK REAL ---
export function processCheckout() {
    if (!currentUser) return false;
    
    // 1. Restar stock de la base de datos maestra
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock = Math.max(0, product.stock - item.quantity);
        }
    });

    // 2. Guardar cambios permanentemente
    saveProductsDB();

    // 3. Vaciar carrito
    cart = [];
    activeDiscount = 0;
    saveCart();

    return true;
}