// Función al empezar a arrastrar
export function iniciarArrastre(ev) {
    // Guardamos el ID del elemento que movemos
    ev.dataTransfer.setData("text", ev.target.id);
}

// Función para permitir soltar (quita la prohibición por defecto)
export function permitirSoltar(ev) {
    ev.preventDefault();
}

// Función al soltar
export function soltar(ev) {
    ev.preventDefault();
    
    // Recuperamos el ID
    const idData = ev.dataTransfer.getData("text");
    const elemento = document.getElementById(idData);

    // ev.currentTarget es la CAJA (.dropzone)
    // Añadimos el elemento a la caja
    ev.currentTarget.appendChild(elemento);

    // Limpieza: Si la imagen tenía colores de validación antiguos, los quitamos
    elemento.classList.remove('correcto', 'incorrecto');
}