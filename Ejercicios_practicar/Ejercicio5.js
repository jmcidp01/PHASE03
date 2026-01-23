//Ejercicio 5: Carrito de Compra (Arrays Avanzados + Reduce)
//Objetivo: Practicar push, filter y especialmente .reduce() para sumar precios (algo muy típico de examen).

//Enunciado: Tienes una lista de productos (botones). Al pulsar uno, se añade al carrito. Debes mostrar el carrito y calcular el total automáticamente.

//1. Crea un array de productos, cada uno con nombre y precio.
const 
const productos = [
    { nombre: "Camisa", precio: 20 },
    { nombre: "Pantalones", precio: 40 },
    { nombre: "Zapatos", precio: 60 },
    { nombre: "Sombrero", precio: 15 }
];

//2. Crea un array vacío para el carrito.
let carrito = [];
let total = 0;

//3. Crea una función para añadir productos al carrito.
function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
}
//4. Crea una función para actualizar y mostrar el carrito y el total.
function actualizarCarrito() {
    console.clear();
    console.log("Carrito:");
    carrito.forEach(producto => {
        console.log(`- ${producto.nombre}: $${producto.precio}`);
    });
    total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    console.log(`Total: $${total}`);
}
//5. Simula la pulsación de botones para añadir productos al carrito.
agregarAlCarrito(productos[0]); // Añadir Camisa
agregarAlCarrito(productos[2]); // Añadir Zapatos
agregarAlCarrito(productos[1]); // Añadir Pantalones    
agregarAlCarrito(productos[3]); // Añadir Sombrero
agregarAlCarrito(productos[0]); // Añadir Camisa nuevamente
agregarAlCarrito(productos[2]); // Añadir Zapatos nuevamente
agregarAlCarrito(productos[1]); // Añadir Pantalones nuevamente
agregarAlCarrito(productos[3]); // Añadir Sombrero nuevamente

//Resultado esperado: Cada vez que se añade un producto, se muestra el carrito actualizado y el total correcto.
//Nota: Este ejercicio es ideal para practicar la manipulación de arrays y el uso de .reduce() para cálculos acumulativos.
//Puedes ejecutar este código en un entorno de JavaScript para ver cómo funciona.