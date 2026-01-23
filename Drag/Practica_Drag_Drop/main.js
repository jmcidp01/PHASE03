// Importamos las funciones de los otros archivos
import { iniciarArrastre, permitirSoltar, soltar } from './dragDrop.js';
import { validarResultados } from './validacion.js';

// 1. Eventos para las IMÁGENES (DragStart)
const imagenes = document.querySelectorAll('img');
imagenes.forEach(img => {
    img.addEventListener('dragstart', iniciarArrastre);
});

// 2. Eventos para las CAJAS DE DESTINO (DragOver y Drop)
const zonas = document.querySelectorAll('.dropzone');
zonas.forEach(zona => {
    zona.addEventListener('dragover', permitirSoltar);
    zona.addEventListener('drop', soltar);
});

// 3. Evento para el botón VALIDAR
document.getElementById('btn-validar').addEventListener('click', validarResultados);

// 4. Evento para el botón REINICIAR
document.getElementById('btn-reiniciar').addEventListener('click', () => {
    location.reload();
});