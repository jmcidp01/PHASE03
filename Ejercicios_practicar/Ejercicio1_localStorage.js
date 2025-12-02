/*Ejercicio 1: Contador de Visitas Persistente
Objetivo: Crear un contador simple que se muestre en la página y que no se reinicie al recargar la pestaña.

Pasos a Seguir:

Crea un elemento <h1> o <p> en tu HTML con el id="contadorVisitas".

En JavaScript, al cargar la página (DOMContentLoaded):

Intenta recuperar el valor de la clave 'visitas' de localStorage.

Si existe, conviértelo a un número, incréméntalo en 1, y guarda el nuevo valor en localStorage.

Si no existe (es la primera visita), establece el valor en 1 y guárdalo.

Actualiza el texto del elemento contadorVisitas para mostrar el número actual.*/
