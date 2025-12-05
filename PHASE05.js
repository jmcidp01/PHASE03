let clientes = [];
let myInterval = null;
const clock = document.getElementById("clock");
const botonReloj = document.getElementById("pararReloj");
const selectorColor = document.getElementById("colores"); // Referencia al select de color
const tbody=document.querySelector('#Infoclientes tbody');
const nombretxt = document.getElementById("nombre");
const anio = document.getElementById("anio");
const habitual = document.getElementById("habitual");
const categoria = document.getElementById("categoria");
const generoRadios = document.getElementsByName("genero");
const btnAddCliente = document.getElementById("btnAddCliente");

btnAddCliente.addEventListener('click', agregarCliente);
function agregarCliente() {
  let datos = capturarDatos();

  if (datos.nombre === "" || datos.anio === "" || datos.categoria === "" || datos.genero === "") {
    alert("Por favor, completa todos los campos antes de añadir.");
    return;
  }

  if (datos.nombre.length > 30) {
    alert("El nombre no puede tener más de 30 caracteres.");
    return;
  }

  let anioNum = Number(datos.anio);
  if (anioNum < 1900 || anioNum > 2025) {
    alert("El año debe estar entre 1900 y 2025.");
    return;
  }

  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].nombre.toLowerCase() === datos.nombre.toLowerCase()) {
      alert("Ese cliente ya está registrado.");
      return;
    }
  }

  clientes.push({
    nombre: datos.nombre,
    anio: anioNum,
    habitual: datos.habitual,
    categoria: datos.categoria,
    genero: datos.genero
  });

  guardarDatos();

  alert("Cliente añadido correctamente.");
  actualizarContador();
  document.getElementById("formCliente").reset();
  mostrarClientesTabla();
}
/*btnAddCliente.addEventListener("click", () => { 
          let datos = capturarDatos();

          if (datos.nombre === "" || datos.anio === "" || datos.categoria === "" || datos.genero === "") {
            alert("Por favor, completa todos los campos antes de añadir.");
            return;
          }

          if (datos.nombre.length > 30) {
            alert("El nombre no puede tener más de 30 caracteres.");
            return;
          }

          let anioNum = Number(datos.anio);
          if (anioNum < 1900 || anioNum > 2025) {
            alert("El año debe estar entre 1900 y 2025.");
            return;
          }

          for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].nombre.toLowerCase() === datos.nombre.toLowerCase()) {
              alert("Ese cliente ya está registrado.");
              return;
            }
          }

          clientes.push({
            nombre: datos.nombre,
            anio: anioNum,
            habitual: datos.habitual,
            categoria: datos.categoria,
            genero: datos.genero  
          });

          guardarDatos();

          alert("Cliente añadido correctamente.");
          actualizarContador();
          document.getElementById("formCliente").reset();
          mostrarClientesTabla();
  
});*/

document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();
  cargarColorReloj(); // Cargar el color al iniciar
  iniciarReloj();
  actualizarContador();
  selectorColor.addEventListener("change", cambiarColorReloj);
  mostrarClientesTabla();
});

function guardarDatos() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

function cargarDatos() {
  let datos = localStorage.getItem("clientes");
  if (datos) {
    clientes = JSON.parse(datos);
    alert("¡Datos cargados correctamente!");
  }
}

function cambiarColorReloj() {
  const colorSeleccionado = selectorColor.value;
  clock.style.color = colorSeleccionado;
  localStorage.setItem("clockColor", colorSeleccionado); // Guardar en localStorage
}
function cargarColorReloj() {
  const colorGuardado = localStorage.getItem("clockColor");
  if (colorGuardado) {
    clock.style.color = colorGuardado;
    selectorColor.value = colorGuardado; // Poner el select en la opción correcta
  }
}
function borrarDatos() {
  if (confirm("¿Seguro que quieres borrar todos los datos?")) {
    clientes = [];
    localStorage.removeItem("clientes");
    localStorage.removeItem("clockColor"); // Opcional: borrar también la preferencia de color
    actualizarContador();
    alert("Todos los datos han sido eliminados.");
    
    // Resetear color visualmente si se borran datos
    clock.style.color = "black";
    selectorColor.value = "black";
  }
}

function actualizarReloj() {
  const date = new Date();
  clock.innerHTML = `Hora actual: ${date.toLocaleTimeString()}`;
}

function iniciarReloj() {
  clock.style.textDecoration = "none";
  clock.style.opacity = "1";
  actualizarReloj();

  myInterval = setInterval(actualizarReloj, 1000);
  botonReloj.textContent = "Detener reloj";
}

function detenerReloj() {
  clearInterval(myInterval);
  myInterval = null;
  clock.style.textDecoration = "line-through";
  clock.style.opacity = "0.5";
  clock.innerHTML += " - Parado";
  botonReloj.textContent = "Iniciar reloj";
}

function alternarReloj() {
  if (myInterval) {
    detenerReloj();
  } else {
    iniciarReloj();
  }
}

document.getElementById("pararReloj").onclick = alternarReloj;

function capturarDatos() {
  let nombretxt=nombretxt.value.trim();
  let anio=anio.value.trim();
  let checkedh=habitual.checked;
  let categoria=categoria.value;
  const genero = "";
  for (let i = 0; i < generoRadios.length; i++) {
    if (generoRadios[i].checked) {
      genero = generoRadios[i].value;
    }
  }

  return { nombretxt, anio, checkedh, categoria, genero };
}


function eliminarCliente() {
  if (clientes.length === 0) {
    alert("No hay clientes para eliminar.");
    return;
  }

  var nombreEliminar = prompt("Introduce el nombre del cliente que quieres eliminar:");

  if (!nombreEliminar) {
    alert("Operación cancelada.");
    return;
  }

  var index = clientes.findIndex(c => c.nombre.toLowerCase() === nombreEliminar.toLowerCase());

  if (index !== -1) {
    clientes.splice(index, 1);
    guardarDatos(); 
    alert("Cliente eliminado correctamente.");
    actualizarContador();
  } else {
    alert("No se encontró un cliente con ese nombre.");
  }
  mostrarClientesTabla();
}

function listarClientes() {
  if (clientes.length === 0) {
    alert("No hay clientes registrados.");
    return;
  }

  var mensaje = "Lista de clientes:\n\n";
  clientes.forEach((c, i) => {
    mensaje += `${i + 1}. ${c.nombre} | Año: ${c.anio} | Habitual: ${c.habitual ? "Sí" : "No"} | Categoría: ${c.categoria} | Género: ${c.genero}\n`;
  });

  alert(mensaje);
}

function finalizar() {
  if (clientes.length === 0) {
    alert("No hay clientes registrados para finalizar.");
    return;
  }

  clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));

  clientes.forEach((c, i) => {
    alert(
      `Cliente ${i + 1}:\n` +
      `Nombre: ${c.nombre}\n` +
      `Año: ${c.anio}\n` +
      `Habitual: ${c.habitual ? "Sí" : "No"}\n` +
      `Categoría: ${c.categoria}\n` +
      `Género: ${c.genero}`
    );
  });

  alert(`Total de clientes registrados: ${clientes.length}`);
}

function actualizarContador() {
  document.getElementById("contador").textContent =
    "Clientes añadidos: " + clientes.length;
}

function mostrarClientesTabla(){
  tbody.innerHTML='';
  clientes.forEach(c =>{
    tbody.innerHTML+=`
    <tr>
    <td>${c.nombre}</td>
    <td>${c.anio}</td>
    <td>${c.habitual ? "Si":"No"}</td>
    <td>${c.categoria}</td>
    <td>${c.genero}</td>
    </tr>`
  })
}
//Esto es una subida com el script de Git en powershell
//This is a commit with Git script in powershell