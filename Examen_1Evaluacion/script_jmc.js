let array_jmc=[];
const key_jmc='Jokes';
const url_jmc='https://api.chucknorris.io/jokes/random';
const lista_jmc=document.getElementById('lista_jmc');
const texto_jmc=document.getElementById('texto_jmc');
const btnAdd_jmc=document.getElementById('btnAdd_jmc');
const color_jmc=document.getElementById('color_jmc');
const cita_jmg=document.getElementById('cita_jmg');
const btnColor_jmc=document.getElementById('btnColor_jmc');

btnAdd_jmc.addEventListener('click',agregarJoke_jmc);
btnColor_jmc.addEventListener('click',cambiarColor_jmc);

document.addEventListener('DOMContentLoaded', ()=>{
    let recuperados_jmc= localStorage.getItem(key_jmc);
    if (recuperados_jmc) {
        array_jmc = JSON.parse(recuperados_jmc);
    } else {
        array_jmc = [];
    }
    pintar_jmc();
    cargarColor_jmc();
    //localStorage.clear(); Lo he utilizado para comprobaciones porque como no puedo ver el Localstorage
})

function agregarJoke_jmc(){
    if(texto_jmc.value){
    let joke_jmc= texto_jmc.value;
    if(joke_jmc){
    if(array_jmc.includes(joke_jmc)){
        window.alert('Esa Joke ya existe');
    }else{
    array_jmc.push(joke_jmc);
    localStorage.setItem(key_jmc, JSON.stringify(array_jmc))
    texto_jmc.textContent='';
    }
}
    }else{
        alert('Debes rellenar el campo!')
}
pintar_jmc();
}

function pintar_jmc(){
    let ul_jmc=document.createElement('ul');
    ul_jmc.innerHTML=``;
    lista_jmc.innerHTML=``;

    array_jmc.forEach((jokes_jmc, index_jmc )=>{
        let item_jmc = document.createElement("li");
        item_jmc.textContent = jokes_jmc;
        ul_jmc.appendChild(item_jmc);
    })
    lista_jmc.appendChild(ul_jmc);
}
fetch(url_jmc)
.then(response_jmc => response_jmc.json())
.then(
    data_jmc=> {
            cita_jmc.textContent = data_jmc.value;
    }
)

function cambiarColor_jmc() {
  const colorSeleccionado_jmc = color_jmc.value;
  cita_jmc.style.color = colorSeleccionado_jmc;
  localStorage.setItem("clockColor", colorSeleccionado_jmc); 
}

function cargarColor_jmc() {
  const colorGuardado_jmc = localStorage.getItem("clockColor");
  if (colorGuardado_jmc) {
    cita_jmc.style.color = colorGuardado_jmc;
    color_jmc.value = colorGuardado_jmc;
  }
}
