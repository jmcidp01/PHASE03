// Funciones exportadas para ser usadas
export function iniciarArrastre(ev) {
    // Guardamos el ID del elemento que estamos moviendo
    ev.dataTransfer.setData("text", ev.target.id);
}

export function permitirSoltar(ev) {
    ev.preventDefault(); // Necesario para poder soltar
}

export function soltar(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const elementoArrastrado = document.getElementById(data);

    // ev.currentTarget asegura que soltamos en el DIV, no sobre otra imagen
    ev.currentTarget.appendChild(elementoArrastrado);
    
    // Limpiamos estilos previos si el usuario está corrigiendo
    elementoArrastrado.classList.remove('correcto', 'incorrecto');
}