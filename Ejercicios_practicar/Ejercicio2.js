//Ejercicio 2: API Fetch + Pintar en el DOM
//Objetivo: Traer datos, convertirlos a JSON y pintarlos en la página.

//Enunciado: Trae los usuarios de https://jsonplaceholder.typicode.com/users y pinta una lista <ul> donde cada <li> muestre el Nombre y el Email.

const principal= document.getElementById("principal");
const botonCargar= document.getElementById("btnCargarUsuarios");
botonCargar.addEventListener("click", Apirest);

function Apirest(){
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response=> response.json())
    .then(response=>{
        pintarUsuarios(response);
    })


function pintarUsuarios(usuarios){
    principal.innerHTML= "<h2>Lista de Usuarios</h2>";
    principal.innerHTML+= `<ul>`;
    usuarios.forEach(usuario => {
        principal.innerHTML+= `<li>Nombre: ${usuario.name} ------ Email: ${usuario.email}</li>`;
    }
);
    principal.innerHTML+= `</ul>`
}
}