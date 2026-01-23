var clientes = [];
let myInterval = null;
const clock = document.getElementById("clock");
const btnReloj = document.getElementById("pararReloj");
const selectorColor = document.getElementById("colores"); // Referencia al select de color
const tbody=document.querySelector('#Infoclientes tbody');
const txtNombre= document.getElementById("nombre");
const txtAnio = document.getElementById("anio");
const chkHabitual = document.getElementById("habitual");
const SelectCategoria = document.getElementById("categoria");
const generoRadios = document.getElementsByName("genero");
const btnAddCliente = document.getElementById("agregarCliente");


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
  actualizarContador();
  mostrarClientesTabla();

  alert("Cliente añadido correctamente.");
  document.getElementById("formCliente").reset();
  mostrarClientesTabla();
}
btnAddCliente.addEventListener("click", agregarCliente);
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

//Función para cargar datos desde LocalStorage
function cargarDatos() {
  let datos = localStorage.getItem("clientes");
  if (datos) {
    clientes = JSON.parse(datos);
    alert("¡Datos cargados correctamente!");
  }
}

//Función para cambiar el color del reloj y guardarlo en LocalStorage
function cambiarColorReloj() {
  const colorSeleccionado = selectorColor.value;
  clock.style.color = colorSeleccionado;
  localStorage.setItem("clockColor", colorSeleccionado); // Guardar en localStorage
}

//Función para cargar el color del reloj desde LocalStorage
function cargarColorReloj() {
  const colorGuardado = localStorage.getItem("clockColor");
  if (colorGuardado) {
    clock.style.color = colorGuardado;
    selectorColor.value = colorGuardado; // Poner el select en la opción correcta
  }
}

//Función para actualizar el reloj
function actualizarReloj() {
  const date = new Date();
  clock.innerHTML = `Hora actual: ${date.toLocaleTimeString()}`;
}

//Función para iniciar el reloj
function iniciarReloj() {
  clock.style.textDecoration = "none";
  clock.style.opacity = "1";
  actualizarReloj();

  myInterval = setInterval(actualizarReloj, 1000);
  btnReloj.value = "Detener reloj";
}

//Función para detener el reloj
function detenerReloj() {
  clearInterval(myInterval);
  myInterval = null;
  clock.style.textDecoration = "line-through";
  clock.style.opacity = "0.5";
  clock.innerHTML += " - Parado";
  btnReloj.value = "Iniciar reloj";
}

//Función para alternar el estado del reloj
function alternarReloj() {
  if (myInterval) {
    detenerReloj();
  } else {
    iniciarReloj();
  }
}

//Función para borrar todos los datos
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
  mostrarClientesTabla();
}

//Función para eliminar un cliente por nombre
function eliminarCliente() {
  if (clientes.length === 0) {
    alert("No hay clientes para eliminar.");
    return;
  }

  let nombreEliminar = prompt("Introduce el nombre del cliente que quieres eliminar:");

  if (!nombreEliminar) {
    alert("Operación cancelada.");
    return;
  }

  let index = clientes.findIndex(c => c.nombre.toLowerCase() === nombreEliminar.toLowerCase());

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

//Función para listar clientes
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

//Función para finalizar y mostrar resumen
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

//Función para actualizar el contador de clientes
function actualizarContador() {
  document.getElementById("contador").textContent =
    "Clientes añadidos: " + clientes.length;
}

//Función para mostrar los clientes en la tabla
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