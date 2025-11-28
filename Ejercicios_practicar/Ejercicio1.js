//Ejercicio 1: Validación de Formulario y Lógica (Switch + Bucles)
//Objetivo: Validar inputs masivamente y usar switch (Requisitos de tus notas).

//Enunciado: Crea una función que lea 2 inputs. Si están vacíos o no son números, alerta. Si son válidos, calcula el precio final según el tipo de cliente ("VIP", "Normal", "Nuevo") usando switch.

let precioFinal=0;
const botonCalcular= document.getElementById("btnCalcular");

botonCalcular.addEventListener("click", calcularPrecioFinal);

function calcularPrecioFinal() {
    const precio= document.getElementById("precio").value.trim();
    const tipoCliente= document.getElementById("tipoCliente").value.trim().toLowerCase();
    precioFinal=0;
    if (isNaN(precio) || precio === "") {
        window.alert("El precio debe ser un número válido.");
        return;
    }else{
        switch(tipoCliente) {
        case "vip":
            precioFinal=parseFloat(precio)* 0.8; //20% de descuento
            break;
        case "normal":
            precioFinal= parseFloat(precio); //Sin descuento
            break;
        case "nuevo":
            precioFinal= parseFloat(precio)*0.95; //5% de descuento
            break;
        default:
            alert("Tipo de cliente no válido.");
            break;
    }
    }
    if(precioFinal>0)window.alert("El precio final es: " + precioFinal.toFixed(2));
    
}
