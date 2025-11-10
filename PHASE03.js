var clientes = [];

let myInterval = setInterval(myTimer, 1000);

function myTimer() {
  const date = new Date();
  if (clock) {
    clock.innerHTML = `Hora actual: ${date.toLocaleTimeString()}`;
  }
}

function toggleReloj() {
  if (myInterval) {
    clearInterval(myInterval);
    myInterval = null;
  } else {
    myInterval = setInterval(myTimer, 1000);
  }
}


function capturarDatos() {
  var nombre = document.getElementById('nombre').value.trim();
  var anio = document.getElementById('anio').value.trim();
  var habitual = document.getElementById('habitual').checked;
  var categoria = document.getElementById('categoria').value;
  var generoRadios = document.getElementsByName('genero');
  var genero = "";

  for (var i = 0; i < generoRadios.length; i++) {
    if (generoRadios[i].checked) {
      genero = generoRadios[i].value;
      break;
    }
  }

  var datos = {
    nombre: nombre,
    anio: anio,
    habitual: habitual,
    categoria: categoria,
    genero: genero
  };

  return datos;
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

  var cliente = {
    nombre: datos.nombre,
    anio: anioNum,
    habitual: datos.habitual,
    categoria: datos.categoria,
    genero: datos.genero
  };

  clientes.push(cliente);

  alert("Cliente añadido correctamente.");
  actualizarContador();

  document.getElementById('formCliente').reset();
}

function eliminarCliente() {
  if (clientes.length === 0) {
    alert("No hay clientes para eliminar.");
    return;
  }

  var nombreEliminar = prompt("Introduce el nombre del cliente que quieres eliminar:");

  if (nombreEliminar === null || nombreEliminar.trim() === "") {
    alert("Operación cancelada o nombre vacío.");
    return;
  }

  var encontrado = false;
  for (var i = 0; i < clientes.length; i++) {
    if (clientes[i].nombre.toLowerCase() === nombreEliminar.toLowerCase()) {
      clientes.splice(i, 1);
      encontrado = true;
      break;
    }
  }

  if (encontrado) {
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
  for (var i = 0; i < clientes.length; i++) {
    var c = clientes[i];
    mensaje += (i + 1) + ". " + c.nombre +
      " | Año: " + c.anio +
      " | Habitual: " + (c.habitual ? "Sí" : "No") +
      " | Categoría: " + c.categoria +
      " | Género: " + c.genero + "\n";
  }

  alert(mensaje);
}

function finalizar() {
  if (clientes.length === 0) {
    alert("No hay clientes registrados para finalizar.");
    return;
  }

  clientes.sort(function(a, b) {
    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
    return 0;
  });

  for (var i = 0; i < clientes.length; i++) {
    var c = clientes[i];
    alert(
      "Cliente " + (i + 1) + ":\n" +
      "Nombre: " + c.nombre + "\n" +
      "Año: " + c.anio + "\n" +
      "Habitual: " + (c.habitual ? "Sí" : "No") + "\n" +
      "Categoría: " + c.categoria + "\n" +
      "Género: " + c.genero
    );
  }

  alert("Total de clientes registrados: " + clientes.length);
}

function actualizarContador() {
  document.getElementById('contador').textContent =
    "Clientes añadidos: " + clientes.length;
}