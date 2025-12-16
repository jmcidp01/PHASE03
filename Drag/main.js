import { iniciarArrastre, permitirSoltar, soltar } from './DragDrop.js';
import { validarResultados } from './validacion.js';

// 1. Asignar eventos a las IMÁGENES (arrastrables)
const imagenes = document.querySelectorAll('img');
imagenes.forEach(img => {
    img.addEventListener('dragstart', iniciarArrastre);
});

// 2. Asignar eventos a las ZONAS DE DESTINO (dropzones)
const zonas = document.querySelectorAll('.dropzone');
zonas.forEach(zona => {
    zona.addEventListener('dragover', permitirSoltar);
    zona.addEventListener('drop', soltar);
});

// 3. Asignar evento al BOTÓN VALIDAR
document.getElementById('btn-validar').addEventListener('click', validarResultados);