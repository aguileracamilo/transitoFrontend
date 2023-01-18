var identificadorInput;
var tipoBox;
var tipoCalleBox;
var numeroInput;
var nivelCongestionInput;

var mensajeIdentificador;
var mensajeNumero;
var mensajeNivelCongestion;

document.addEventListener('DOMContentLoaded', function () {
    agregarEventoBotones();
    agregarEventosFilas();
    seleccionarFilaMTabla();
    getAgentes();
    /*
    vaciarFormulario();
    */
    getVias();
    inicializarInputs();
});
function inicializarInputs() {
    identificadorInput = document.querySelector("#input-id-via");
    tipoBox = document.querySelector("#box-tipo-via");
    tipoCalleBox = document.querySelector("#box-tipo-calle");
    numeroInput = document.querySelector("#input-numero-ruta");
    nivelCongestionInput = document.querySelector("#input-nivel-congestion");

    mensajeIdentificador = document.querySelector("#mensaje-id-via");
    mensajeNumero = document.querySelector("#mensaje-numero-ruta");
    mensajeNivelCongestion = document.querySelector("#mensaje-nivel-congestion");

}
function blanquear() {
    identificadorInput.classList.remove("corregir")
    mensajeIdentificador.innerHTML = ""

    numeroInput.classList.remove("corregir")
    mensajeNumero.innerHTML = ""

    nivelCongestionInput.classList.remove("corregir")
    mensajeNivelCongestion.innerHTML = ""

}

function agregarRegistrosAtabla(item) {
    var table = document.getElementById("encabezado").parentNode;
    var fila = document.createElement("tr");
    var identificadorCol = document.createElement("td");
    var tipoViaCol = document.createElement("td");
    var tipoCalleCol = document.createElement("td");
    var numeroCol = document.createElement("td");
    var nivelCongestionCol = document.createElement("td");

    identificadorCol.innerHTML = item.idVia;
    tipoViaCol.innerHTML = item.tipoVia;
    tipoCalleCol.innerHTML = item.tipoCalle;
    numeroCol.innerHTML = item.numeroRuta;
    nivelCongestionCol.innerHTML = item.nivelCongestion;

    fila.appendChild(identificadorCol);
    fila.appendChild(tipoViaCol);
    fila.appendChild(tipoCalleCol);
    fila.appendChild(numeroCol);
    fila.appendChild(nivelCongestionCol);

    fila.id = "fila-seleccionada";
    table.appendChild(fila);
}
function agregarEventosFilas() {
    const table = document.getElementById("myTable");
    let selectedRow = null;
    table.addEventListener("mousedown", function (e) {
        selectedRow = e.target.parentNode;
    });
    table.addEventListener("mouseup", function (e) {
        const newSelectedRow = e.target.parentNode;
        if (newSelectedRow === selectedRow && newSelectedRow.id !== "encabezado") {
            if (newSelectedRow.classList.contains("color-fondo")) {
                newSelectedRow.classList.remove("color-fondo");
            } else {
                const currentSelectedRow = table.querySelector(".color-fondo");
                if (currentSelectedRow) {
                    currentSelectedRow.classList.remove("color-fondo");
                }
                newSelectedRow.classList.add("color-fondo");
            }
        }
    });
}
function estaViaCompleta() {
    resultado = true
    blanquear();

    
    if (identificadorInput.value =="") {
        identificadorInput.classList.add("corregir")
        mensajeIdentificador.innerHTML = "Vacío o Carácter no válido (+,*,-,e)"
        resultado = false
    }
    if (identificadorInput.value < 0) {
        identificadorInput.classList.add("corregir")
        mensajeIdentificador.innerHTML = "No se permite un número menor a 0"
        resultado = false
    }
    if (numeroInput.value =="") {
        numeroInput.classList.add("corregir")
        mensajeNumero.innerHTML = "Vacío o Carácter no válido (+,*,-,e)"
        resultado = false
    }
    if (numeroInput.value < 0) {
        numeroInput.classList.add("corregir")
        mensajeNumero.innerHTML = "No se permite un número menor a 0"
        resultado = false
    }
    if (nivelCongestionInput.value =="") {
        nivelCongestionInput.classList.add("corregir")
        mensajeNivelCongestion.innerHTML = "Vacío o Carácter no válido (+,*,-,e)"
        resultado = false
    }
    if (nivelCongestionInput.value < 0) {
        nivelCongestionInput.classList.add("corregir")
        mensajeNivelCongestion.innerHTML = "No se permite un número menor a 0"
        resultado = false
    }
    return resultado;
}
function agregarEventoBotones() {
    
    let botonRegistrarAgente = document.getElementById('btn-registrar')
    botonRegistrarAgente.addEventListener('click', registrarVia)
   /* let botonActualizarAgente = document.getElementById('btn-actualizar')
    botonActualizarAgente.addEventListener('click', actualizarAgente)
    let botonBorrarAgente = document.getElementById('btn-borrar')
    botonBorrarAgente.addEventListener('click', borrarAgente)
    let botonLimpiar = document.getElementById('btn-limpiar')
    botonLimpiar.addEventListener('click', vaciarFormulario)*/
}
