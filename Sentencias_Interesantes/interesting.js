//Comparamos numeros 
const ordenAscendenteTernario = (a, b) => (a < b ? -1 : (a > b ? 1 : 0));
//Ordenar un array de números usando el comparador ternario
const numeros = [5, 2, 9, 1, 5, 6];
const ordenados = numeros.slice().sort((a, b) => (a < b ? -1 : (a > b ? 1 : 0)));
// Filtrar números pares usando arrow function y filter
const pares = numeros.filter(num => num % 2 === 0)
// Agregar un nuevo elemento al inicio de una lista usando insertBefore
lista.insertBefore(nuevoItem, lista.firstElementChild);
// Convertir una colección HTML a un array usando Array.from
const items = Array.from(lista.getElementsByTagName('li'));
// Buscar y filtrar elementos en una lista basada en la entrada del usuario
buscar.addEventListener('input', () => {
    const filtro = buscar.value.toLowerCase();
    const items = Array.from(lista.getElementsByTagName('li')); 
    const filtrados = items.filter(item => item.textContent.toLowerCase().includes(filtro));
    lista.innerHTML = '';
    filtrados.forEach(item => lista.appendChild(item));

});