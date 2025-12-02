let myInterval = null;
const clock = document.getElementById("clock");
const btnReloj = document.getElementById("pararReloj");
const selectorColor = document.getElementById("colores");
const btnGuardar=document.getElementById('guardar');

btnReloj.addEventListener("click", alternarReloj);
selectorColor.addEventListener("change", cambiarColorReloj);

document.addEventListener("DOMContentLoaded", () => {
  cargarColorReloj(); // Cargar el color al iniciar
  iniciarReloj();
});

function alternarReloj() {
  if (myInterval) {
    detenerReloj();
  } else {
    iniciarReloj();
  }
}

function actualizarReloj() {
  const date = new Date();
  clock.innerHTML = `Hora actual: ${date.toLocaleTimeString()}`;
}

function iniciarReloj() {
  clock.style.textDecoration = "none";
  clock.style.opacity = "1";
  localStorage.setItem("clockColor", selectorColor.value);
  actualizarReloj();

  myInterval = setInterval(actualizarReloj, 1000);
  btnReloj.value = "Detener reloj";
}

function detenerReloj() {
  clearInterval(myInterval);
  myInterval = null;
  clock.style.textDecoration = "line-through";
  clock.style.opacity = "0.5";
  clock.innerHTML += " - Parado";
  btnReloj.value = "Iniciar reloj";
}

function cambiarColorReloj() {
  const colorSeleccionado = selectorColor.value;
  clock.style.color = colorSeleccionado;
  localStorage.setItem("clockColor", colorSeleccionado); 
}

function cargarColorReloj() {
  const colorGuardado = localStorage.getItem("clockColor");
  if (colorGuardado) {
    clock.style.color = colorGuardado;
    selectorColor.value = colorGuardado;
  }
}

function borrarDatos() {
    localStorage.removeItem("clockColor"); // Opcional: borrar también la preferencia de color
    alert("Todos los datos han sido eliminados.");
    clock.style.color = "black";
    selectorColor.value = "black";
  }