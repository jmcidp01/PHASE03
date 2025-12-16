export function validarResultados() {
    let aciertos = 0;
    let errores = 0;
    let totalItems = 0;

    // 1. Seleccionamos todas las zonas de destino (los divs con clase dropzone)
    const zonas = document.querySelectorAll('.dropzone');

    zonas.forEach(zona => {
        // ¿Qué categoría espera esta zona? (ej: "animal")
        const categoriaEsperada = zona.dataset.categoria;
        
        // Buscamos las imágenes que el usuario soltó dentro de esta zona
        const imagenesDentro = zona.querySelectorAll('img');

        imagenesDentro.forEach(img => {
            totalItems++;
            // ¿Qué categoría tiene la imagen?
            const categoriaImagen = img.dataset.categoria;

            if (categoriaEsperada === categoriaImagen) {
                // COINCIDE: Verde
                img.classList.add('correcto');
                img.classList.remove('incorrecto');
                aciertos++;
            } else {
                // NO COINCIDE: Rojo
                img.classList.add('incorrecto');
                img.classList.remove('correcto');
                errores++;
            }
        });
    });

    // MENSAJES DE RESULTADO
    if (totalItems === 0) {
        alert("¡No has movido ninguna imagen todavía!");
    } else if (errores === 0) {
        alert(`¡Felicidades! Todo correcto. Has clasificado ${aciertos} elementos bien.`);
    } else {
        alert(`Has tenido ${aciertos} aciertos y ${errores} fallos. ¡Corrige los rojos e inténtalo de nuevo!`);
    }
}