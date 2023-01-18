var identificadorInput;
var tipoBox;
var tipoCalleBox;
var numeroInput;
var nivelCongestionInput;
var codigoIdViaSeleccionada = 0;

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
function vaciarFormulario() {
    identificadorInput.value="";
    numeroInput.value="";
    nivelCongestionInput.value="";
    codigoIdViaSeleccionada = 0;

    const selectedRows = document.querySelectorAll("tr.color-fondo");
    for (let i = 0; i < selectedRows.length; i++) {
        selectedRows[i].classList.remove("color-fondo")
    }
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
                idViaSeleccionada = 0
                newSelectedRow.classList.remove("color-fondo");
            } else {
                const currentSelectedRow = table.querySelector(".color-fondo");
                if (currentSelectedRow) {
                    currentSelectedRow.classList.remove("color-fondo");
                }
                idViaSeleccionada = parseInt(newSelectedRow.cells[0].innerHTML)
                buscarEnTablaA(newSelectedRow.cells[0].innerHTML);
                llenarFormulario(newSelectedRow);
                newSelectedRow.classList.add("color-fondo");
            }
        }
    });
}
function actualizarFilaVia(item) {
    id = (idViaSeleccionada != 0) ? idViaSeleccionada : identificadorInput.value;
    let filas = document.querySelectorAll("#myTable tr");

    for (let i = 0; i < filas.length; i++) {
        if (filas[i].cells[0].innerHTML == id) {
            filas[i].cells[0].innerHTML = item.idVia
            filas[i].cells[1].innerHTML = item.tipoVia
            filas[i].cells[2].innerHTML = item.tipoCalle
            filas[i].cells[3].innerHTML = item.numeroRuta
            filas[i].cells[4].innerHTML = item.nivelCongestion
        }
    }
    codigoAgenteSeleccionado = item.codigo
}

function llenarFormulario(fila) {

    identificadorInput.value = fila.cells[0].innerHTML;

    switch (fila.cells[1].innerHTML) {
        case "AUTOPISTA":
            tipoBox.value = "opcion1";
            break;
        case "CARRETERA_PRINCIPAL":
            tipoBox.value = "opcion2";
            break;
        case "CARRETERA_SECUNDARIA":
            tipoBox.value = "opcion3";
            break;
        default:
            console.log("Opcion no valida");
    }
    switch (fila.cells[2].innerHTML) {
        case "CALLE":
            tipoCalleBox.value = "opcion1";
            break;
        case "CARRERA":
            tipoCalleBox.value = "opcion2";
            break;
        default:
            console.log("Opcion no valida");
    }
    numeroInput.value = fila.cells[3].innerHTML;
    nivelCongestionInput.value = fila.cells[4].innerHTML;


}
function estaViaCompleta() {
    resultado = true
    blanquear();


    if (identificadorInput.value == "") {
        identificadorInput.classList.add("corregir")
        mensajeIdentificador.innerHTML = "Vacío o Carácter no válido (+,*,-,e)"
        resultado = false
    }
    if (identificadorInput.value < 0) {
        identificadorInput.classList.add("corregir")
        mensajeIdentificador.innerHTML = "No se permite un número menor a 0"
        resultado = false
    }
    if (numeroInput.value == "") {
        numeroInput.classList.add("corregir")
        mensajeNumero.innerHTML = "Vacío o Carácter no válido (+,*,-,e)"
        resultado = false
    }
    if (numeroInput.value < 0) {
        numeroInput.classList.add("corregir")
        mensajeNumero.innerHTML = "No se permite un número menor a 0"
        resultado = false
    }
    if (nivelCongestionInput.value == "") {
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
    let botonActualizarAgente = document.getElementById('btn-actualizar')
    botonActualizarAgente.addEventListener('click', actualizarVia)
    /*let botonBorrarAgente = document.getElementById('btn-borrar')
    botonBorrarAgente.addEventListener('click', borrarAgente)*/
    let botonLimpiar = document.getElementById('btn-limpiar')
    botonLimpiar.addEventListener('click', vaciarFormulario)
}
