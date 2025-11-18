var clientes = [];
let myInterval = null;
const clock = document.getElementById("clock");
const botonReloj = document.getElementById("pararReloj");
const selectorColor = document.getElementById("colores"); // Referencia al select de color

document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();
  cargarColorReloj(); // Cargar el color al iniciar
  iniciarReloj();
  actualizarContador();
  
  // Evento para cambiar el color cuando se selecciona en el menú
  selectorColor.addEventListener("change", cambiarColorReloj);
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

// --- NUEVAS FUNCIONES PARA EL COLOR ---

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

// --------------------------------------

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
  var nombre = document.getElementById("nombre").value.trim();
  var anio = document.getElementById("anio").value.trim();
  var habitual = document.getElementById("habitual").checked;
  var categoria = document.getElementById("categoria").value;

  var generoRadios = document.getElementsByName("genero");
  var genero = "";
  for (var i = 0; i < generoRadios.length; i++) {
    if (generoRadios[i].checked) {
      genero = generoRadios[i].value;
    }
  }

  return { nombre, anio, habitual, categoria, genero };
}

function agregarCliente() {
  var datos = capturarDatos();

  if (datos.nombre === "" || datos.anio === "" || datos.categoria === "" || datos.genero === "") {
    alert("Por favor, completa todos los campos antes de añadir.");
    return;
  }

  if (datos.nombre.length > 30) {
    alert("El nombre no puede tener más de 30 caracteres.");
    return;
  }

  var anioNum = Number(datos.anio);
  if (anioNum < 1900 || anioNum > 2025) {
    alert("El año debe estar entre 1900 y 2025.");
    return;
  }

  for (var i = 0; i < clientes.length; i++) {
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