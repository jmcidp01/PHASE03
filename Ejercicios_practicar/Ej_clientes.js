let invitados=[];
const Key='Clientes';
const nom=document.getElementById('nom');
const btnagregar=document.getElementById('btnagregar');
const container=document.getElementById('container');
const sugerencias=document.getElementById('sugerencias');
const url='https://jsonplaceholder.typicode.com/users';
const ul=document.createElement('ul');

btnagregar.addEventListener('click',agregarCliente);

document.addEventListener('DOMContentLoaded', ()=>{
    let recuperados = localStorage.getItem(Key);
    if (recuperados) {
        invitados = JSON.parse(recuperados);
    } else {
        invitados = [];
    }
    actualizarLista();
})

fetch(url)
    .then(response => response.json())
    .then(data=>{
        pintarAPI(data);
    })

function pintarAPI(data){
    sugerencias.innerHTML=``;
    let ul=document.createElement('ul');
    data.forEach(user=>{
        let li=document.createElement('li');
        li.innerHTML+=`
            Nombre: ${user.name} - ${user.email}`;
        ul.appendChild(li);
    })
    sugerencias.appendChild(ul);
}

function agregarCliente(){
    let nombre= nom.value;
    if(nombre){
    invitados.push(nombre);
    localStorage.setItem(Key, JSON.stringify(invitados))
    nom.textContent='';
    actualizarLista();
    }
}

function actualizarLista(){
    ul.innerHTML=``;
    container.innerHTML=``;

    invitados.forEach((invitado, index )=>{
        let item = document.createElement("li");
        item.textContent = invitado + " ";
        let boton=document.createElement('button');
        boton.textContent='X';
        boton.addEventListener('click', ()=>{
            invitados.splice(index, 1);
            localStorage.setItem(Key, JSON.stringify(invitados));
            actualizarLista(); 
        });
        item.appendChild(boton);
        ul.appendChild(item);
    })
    container.appendChild(ul);
}