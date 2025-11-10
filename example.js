function mostrarHora()
{
    let ahora=new Date();
    window.alert("Hora actual:",
    ahora.toLocaleTimeString());
}

setInterval(mostrarHora, 5000)

//MODIFICA TU PRACTICA PHASE03
//PARA QUE MUESTRE EN UN DIV
//USANDO SETINTERVAL UN RELOJ DIGITAL
//QUE SE ACTUALICE CADA SEGUNDO