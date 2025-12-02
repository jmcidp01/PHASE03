const contenedorDiv = document.getElementById('contenedor');
const campoInput = document.getElementById('campo');
const resultadoDiv = document.getElementById('resultado');
const btnAccion = document.getElementById('btnAccion'); // Capturamos el botón por ID

// --- 1. FUNCIÓN PRINCIPAL DE MANIPULACIÓN ---
function mostrarValores() {
    // ------------------------------------------------------------------
    // A. LECTURA (Lo que el navegador ve ahora)
    // ------------------------------------------------------------------
    let lecturaHTML = contenedorDiv.innerHTML;
    let lecturaTexto = contenedorDiv.textContent;
    let lecturaValor = campoInput.value;

    let salida = `
        <h3>--- LECTURA (Lo que hay ahora) ---</h3>
        <p><strong>contenedorDiv.innerHTML:</strong> ${lecturaHTML}</p>
        <p><strong>contenedorDiv.textContent:</strong> ${lecturaTexto}</p>
        <p><strong>campoInput.value:</strong> ${lecturaValor}</p>
        <hr>
    `;

    // ------------------------------------------------------------------
    // B. ESCRITURA (Demostrando la diferencia)
    // ------------------------------------------------------------------

    // 1. innerHTML: Inyecta etiquetas (verás el texto en negrita y subrayado)
    contenedorDiv.innerHTML = '¡Contenido **MODIFICADO** con <u>innerHTML</u>!';

    // 2. value: Cambia el texto dentro de la caja de input
    campoInput.value = 'Valor cambiado por JavaScript';

    // ------------------------------------------------------------------
    // C. Mostrar Resultados y Resumen
    // ------------------------------------------------------------------
    resultadoDiv.innerHTML = salida;
    resultadoDiv.innerHTML += '<h3>--- ESCRITURA (Resultado) ---</h3>';
    resultadoDiv.innerHTML += '<p style="color: blue;">(Revisa el DIV y el INPUT para ver los cambios permanentes)</p>';
}

// --- 2. CONEXIÓN DEL EVENTO CON addEventListener ---
// Cuando el usuario haga click en el botón, se ejecuta la función mostrarValores
btnAccion.addEventListener('click', mostrarValores);