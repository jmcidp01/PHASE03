//Ejercicio 4: LocalStorage + Descargar Archivo (Blob)
//Objetivo: Guardar un array de objetos y permitir descargarlo. (Basado en tu archivo jsonsavedata.html).

//Enunciado: Tienes una lista de tareas. Guárdala en LocalStorage. Crea un botón que descargue esa lista en un archivo .json.

//Lista de tareas
const tareas = [
    { id: 1, tarea: "Comprar leche", completada: false },
    { id: 2, tarea: "Lavar el coche", completada: true },
    { id: 3, tarea: "Estudiar JavaScript", completada: false }
];

// Guardar la lista de tareas en LocalStorage
localStorage.setItem('tareas', JSON.stringify(tareas));
console.log("Lista de tareas guardada en LocalStorage.");

// Función para descargar la lista de tareas como archivo .json
function descargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        const blob = new Blob([tareasGuardadas], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tareas.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log("Archivo tareas.json descargado.");
    } else {
        console.log("No hay tareas guardadas en LocalStorage.");
    }
}