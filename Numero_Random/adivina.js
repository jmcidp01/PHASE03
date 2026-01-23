// --- 1. CONFIGURACIÓN INICIAL ---
const MINIMO = 1;
const MAXIMO = 100;
let numeroSecreto;
let intentos = 0; // Contador de intentos

// Selectores del DOM
const intentoInput = document.getElementById('intento');
const btnAdivinar = document.getElementById('btnAdivinar');
const resultadoDiv = document.getElementById('resultado');

// --- 2. GENERACIÓN DEL NÚMERO SECRETO ---
function generarNumeroSecreto() {
    // Math.random() * (MAXIMO - MINIMO + 1) genera un número entre 0 y 100.
    // Math.floor() lo convierte a entero.
    // + MINIMO asegura que el rango vaya de 1 a 100.
    numeroSecreto = Math.floor(Math.random() * (MAXIMO - MINIMO + 1)) + MINIMO;
    console.log(`Pista para el desarrollador: El número secreto es ${numeroSecreto}`);
    intentos = 0; // Reiniciamos el contador cada vez que se genera uno nuevo
}

// --- 3. LÓGICA DEL JUEGO ---
function comprobarAdivinanza() {
    // 1. Obtener el valor del usuario y convertirlo a número
    const intentoUsuario = parseInt(intentoInput.value);

    // Validación básica: asegura que sea un número válido y no vacío
    if (isNaN(intentoUsuario) || intentoUsuario < MINIMO || intentoUsuario > MAXIMO) {
        resultadoDiv.textContent = 'Por favor, introduce un número válido entre 1 y 100.';
        resultadoDiv.style.color = 'orange';
        return; // Salimos de la función si la entrada es inválida
    }

    intentos++; // Sumamos un intento

    // 2. Comparar
    if (intentoUsuario === numeroSecreto) {
        resultadoDiv.textContent = `¡Felicidades! ¡Adivinaste el número ${numeroSecreto} en ${intentos} intentos!`;
        resultadoDiv.style.color = 'green';
        btnAdivinar.disabled = true; // Desactivamos el botón al ganar
    } else if (intentoUsuario > numeroSecreto) {
        resultadoDiv.textContent = `Demasiado alto. Intenta de nuevo. (Intento ${intentos})`;
        resultadoDiv.style.color = 'red';
    } else {
        resultadoDiv.textContent = `Demasiado bajo. Intenta de nuevo. (Intento ${intentos})`;
        resultadoDiv.style.color = 'red';
    }

    // Limpiamos el input para el siguiente intento
    intentoInput.value = '';
}

// --- 4. EVENTOS ---
document.addEventListener('DOMContentLoaded', () => {
    // Generamos el número secreto al cargar la página
    generarNumeroSecreto();
});

// Añadimos el evento al botón
btnAdivinar.addEventListener('click', comprobarAdivinanza);

// Opcional: Permitir adivinar pulsando Enter
intentoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que se envíe el formulario
        comprobarAdivinanza();
    }
});