export function validarResultados() {
    let aciertos = 0;
    let errores = 0;
    let totalItems = 0; // Necesitamos contar si ha movido algo

    // Validar las imágenes
    const zonas = document.querySelectorAll('.dropzone');

    zonas.forEach(zona => {
        const categoriaCaja = zona.dataset.categoria;
        const imagenes = zona.querySelectorAll('img');

        imagenes.forEach(img => {
            totalItems++; // Contamos que hay una imagen colocada
            const categoriaImagen = img.dataset.categoria;

            if (categoriaCaja === categoriaImagen) {
                img.classList.add('correcto');
                img.classList.remove('incorrecto');
                aciertos++;
            } else {
                img.classList.add('incorrecto');
                img.classList.remove('correcto');
                errores++;
            }
        });
    });

    // MOSTRAR EL MENSAJE EN PANTALLA
    const mensajeElemento = document.getElementById('mensaje-resultado');
    
    // Reseteamos estilos previos
    mensajeElemento.style.fontWeight = "bold";

    if (totalItems === 0) {
        // Caso: No ha movido nada
        mensajeElemento.textContent = "Arrastra las imágenes primero.";
        mensajeElemento.style.color = "#e67e22"; // Naranja
    } 
    else if (errores === 0) {
        // Caso: Todo perfecto
        mensajeElemento.textContent = `¡Excelente! ${aciertos} aciertos.`;
        mensajeElemento.style.color = "#27ae60"; // Verde
    } 
    else {
        // Caso: Hay fallos
        mensajeElemento.textContent = `Tienes ${aciertos} bien y ${errores} mal.`;
        mensajeElemento.style.color = "#c0392b"; // Rojo
    }
}