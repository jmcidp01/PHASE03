// CONFIGURACIÓN INICIAL
const PRECIO_ENTRADA = 10;
const urlAPI = 'https://jsonplaceholder.typicode.com/photos/1';
const Cuadricula = document.getElementById('Cuadricula');
const principal = document.getElementById('principal');
const spanContador = document.getElementById('contador');
const spanTotal = document.getElementById('total');
const spanCantidad = document.getElementById('cantidad');
const btnConfirmar = document.getElementById('btnConfirmar');

// MATRIZ INICIAL (0 = Libre, 1 = Ocupado)
// Si no hay nada en LocalStorage, usamos esta por defecto.
let salaCine = [
    [0, 0, 0, 1, 0], // Fila 0
    [0, 0, 0, 0, 0], // Fila 1
    [0, 1, 1, 0, 0], // Fila 2
    [0, 0, 0, 0, 0]  // Fila 3
];

// 1. CARGA INICIAL (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    // A. Intentar recuperar datos guardados
    let guardado = localStorage.getItem('SalaCineData');
    if (guardado) {
        salaCine = JSON.parse(guardado);
    }

    // B. Iniciar funciones
    pintarSala();
    iniciarReloj();
    cargarPelicula();
});

// 2. FUNCIÓN PARA PINTAR LA SALA (Recorrer Array Bidimensional)
function pintarSala() {
    Cuadricula.innerHTML = ''; // Limpiar antes de pintar
    let tabla = document.createElement('table');

    // Bucle para las FILAS
    salaCine.forEach((fila, indiceFila) => {
        let tr = document.createElement('tr');

        // Bucle para las COLUMNAS (Asientos)
        fila.forEach((asiento, indiceColumna) => {
            let td = document.createElement('td');
            
            // Asignar clase según estado (0 o 1)
            if (asiento === 1) {
                td.textContent = 'X';
                td.className = 'ocupado'; // Rojo (definido en CSS)
            } else {
                td.textContent = 'L';
                td.className = 'libre';   // Verde
                
                // IMPORTANTE: Evento Click solo si está libre
                td.addEventListener('click', function() {
                    toggleSeleccion(td); // Llamamos a la función de seleccionar
                });
            }

            tr.appendChild(td);
        });
        tabla.appendChild(tr);
    });
    Cuadricula.appendChild(tabla);
}

// 3. LÓGICA DE SELECCIÓN Y PRECIO
function toggleSeleccion(celda) {
    // Si tiene la clase 'libre', la cambiamos a 'seleccionado' y viceversa
    if (celda.classList.contains('libre')) {
        celda.classList.remove('libre');
        celda.classList.add('seleccionado');
    } else {
        celda.classList.remove('seleccionado');
        celda.classList.add('libre');
    }
    calcularTotal();
}

function calcularTotal() {
    // Buscamos todos los elementos que tengan la clase 'seleccionado'
    const seleccionados = document.querySelectorAll('.seleccionado');
    const cantidad = seleccionados.length;
    
    // Actualizamos el HTML
    spanCantidad.textContent = cantidad;
    spanTotal.textContent = cantidad * PRECIO_ENTRADA;
}

// 4. CONFIRMAR COMPRA (Guardar en Array y LocalStorage)
btnConfirmar.addEventListener('click', () => {
    // Recorremos visualmente la tabla para actualizar nuestra Matriz de datos
    const filasVisuales = document.querySelectorAll('tr');
    
    filasVisuales.forEach((tr, indexFila) => {
        const celdas = tr.querySelectorAll('td');
        
        celdas.forEach((td, indexColumna) => {
            // Si visualmente está "seleccionado", en los datos lo ponemos a 1 (Ocupado)
            if (td.classList.contains('seleccionado')) {
                salaCine[indexFila][indexColumna] = 1;
            }
        });
    });

    // Guardamos en el navegador
    localStorage.setItem('SalaCineData', JSON.stringify(salaCine));
    
    alert('¡Compra realizada!');
    location.reload(); // Recargamos la página para ver los cambios
});

// 5. RELOJ (INTERVAL)
function iniciarReloj() {
    let tiempo = 60;
    
    const idIntervalo = setInterval(() => {
        tiempo--; // Restamos 1
        spanContador.textContent = tiempo; // Pintamos

        if (tiempo === 0) {
            clearInterval(idIntervalo); // Paramos el reloj
            alert('¡Tiempo agotado!');
            Cuadricula.style.pointerEvents = 'none'; // Bloqueamos clics en la tabla
            btnConfirmar.disabled = true; // Desactivamos botón
        }
    }, 1000); // Se repite cada 1000ms (1 segundo)
}

// 6. API (FETCH)
function cargarPelicula() {
    fetch(urlAPI)
        .then(res => res.json())
        .then(data => {
            // Creamos imagen y titulo
            let h2 = document.createElement('h2');
            h2.textContent = data.title;
            
            let img = document.createElement('img'); // ETIQUETA CORRECTA IMG
            img.src = data.url; 
            
            principal.appendChild(h2);
            principal.appendChild(img);
        });
}