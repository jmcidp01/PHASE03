const url='https://jsonplaceholder.typicode.com/photos/1';
const columnas=10;
let salaCine=[[0,1],[0,1],[0,0],[1,0],[0,0]];
let pintFila=``;
let tabla=document.createElement('table');
const Cuadricula=document.getElementById('Cuadricula');
const principal=document.getElementById('principal');
const reloj=document.querySelector('.reloj');
let myInterval=60;




document.addEventListener('DOMContentLoaded', ()=>{
    Imprimir();
    reloj.innerHTML=setInterval(myInterval-1,1000);
})

function Imprimir() {
    // 1. Limpiamos el contenedor antes de dibujar para no duplicar si llamas a la función varias veces
    Cuadricula.innerHTML = ''; 
    // 2. Creamos la tabla
    let tabla = document.createElement('table');
    let div1=document.createElement('div');
    // Cambiamos el nombre del argumento a 'datosFila' para no confundirlo con el elemento HTML
    salaCine.forEach((datosFila, indiceFila) => {
        // Creamos la fila HTML (tr)
        let filaTr = document.createElement('tr'); 

        datosFila.forEach((asiento, indiceColumna) => {
            // Creamos la celda (td)
            let columnaTd = document.createElement('td');
            // Ponemos el texto
            columnaTd.textContent = asiento ? 'Ocupado' : 'Libre';
            // Estilos opcionales para ver mejor la cuadrícula
            columnaTd.style.border = '1px solid black';
            columnaTd.style.textAlign = 'center';
            // Si está ocupado, pintamos de rojo, si libre, de verde (ejemplo visual)
            columnaTd.style.backgroundColor = asiento ? '#ffcccc' : '#ccffcc';
            // Añadimos la celda a la fila
            filaTr.appendChild(columnaTd);
            let p=document.createElement('p');
            p.textContent=`Fila ${indiceFila}, Columna ${indiceColumna}= ${asiento ? 'ocupado' : 'Libre'}`;
        div1.appendChild(p);
        ;
        });
        // 3. ¡IMPORTANTE! Añadimos la fila a la tabla DENTRO del bucle
        tabla.appendChild(filaTr);
    });
    // 4. Finalmente añadimos la tabla completa al DOM
    Cuadricula.appendChild(tabla);
    Cuadricula.appendChild(div1);
}

fetch(url)
.then(response => response.json())
.then(
    data=> {
        pelicula(data);
    }
)

function pelicula(data){
    let titulo=document.createElement('h2');
    let url=document.createElement('url');
    titulo.textContent=data.title;
    url.textContent=data.url;
    principal.appendChild(titulo);
    principal.appendChild(url);
}

