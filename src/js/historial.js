var tablaAgente;
var tablaVia;
var comboBox

var buscadorInput;

document.addEventListener('DOMContentLoaded', function () {
    cargarTablas();
    let botonBuscar = document.getElementById('btn-buscar')
    botonBuscar.addEventListener('click', buscar)

    comboBox = document.getElementById('box-agente-via');
    buscadorInput = document.getElementById('input-id-via')
    comboBox.addEventListener("change", cambiarTabla);

    agregarEventosAgente()
    agregarEventosVia()
    getAgentes("encabezado");
    getVias("encabezado1");
});

function cargarTablas() {

    tablaAgente = document.getElementById('scroll-principal-agente')
    tablaVia = document.getElementById('scroll-principal-via')
    tablaVia.style.display = 'none';
}

function cambiarTabla() {

    if (comboBox.selectedIndex == 0) {

        tablaVia.style.display = 'none';
        tablaAgente.style.display = 'block';
    } else {
        tablaAgente.style.display = 'none';
        tablaVia.style.display = 'block';
    }
    borrarFilas()
}

function agregarEventosAgente() {
    const table = tablaAgente
    let selectedRow = null;
    table.addEventListener("mousedown", function (e) {
        selectedRow = e.target.parentNode;
    });
    table.addEventListener("mouseup", function (e) {
        const newSelectedRow = e.target.parentNode;

        if (newSelectedRow === selectedRow && newSelectedRow.id !== "encabezado" && newSelectedRow.tagName === "TR") {
            if (newSelectedRow.classList.contains("color-fondo")) {
                borrarFilas()
                newSelectedRow.classList.remove("color-fondo");
            } else {
                const currentSelectedRow = table.querySelector(".color-fondo");
                if (currentSelectedRow && currentSelectedRow !== newSelectedRow) {
                    borrarFilas()
                    currentSelectedRow.classList.remove("color-fondo");
                }
                getAgentesHistorial(newSelectedRow.cells[2].innerHTML)
                newSelectedRow.classList.add("color-fondo");
            }
        }
    });
}
function agregarEventosVia() {
    const table = tablaVia;
    let selectedRow = null;
    table.addEventListener("mousedown", function (e) {
        selectedRow = e.target.parentNode;
    });
    table.addEventListener("mouseup", function (e) {
        const newSelectedRow = e.target.parentNode;
        if (newSelectedRow === selectedRow && newSelectedRow.id !== "encabezado1" && newSelectedRow.tagName === "TR") {
            if (newSelectedRow.classList.contains("color-fondo")) {
                borrarFilas()
                newSelectedRow.classList.remove("color-fondo");
            } else {
                const currentSelectedRow = table.querySelector(".color-fondo");
                if (currentSelectedRow) {
                    borrarFilas()
                    currentSelectedRow.classList.remove("color-fondo");
                }
                getViaHistorial(newSelectedRow.cells[0].innerHTML)
                newSelectedRow.classList.add("color-fondo");
            }
        }
    });
}


function agregarRegistrosAtablaHistorial(item) {
    var table = document.getElementById('myTableM');
    var fila = document.createElement("tr");
    var codigoAgenteCol = document.createElement("td");
    var idViaCol = document.createElement("td");
    var fechaCol = document.createElement("td");

    codigoAgenteCol.innerHTML = item.agente;
    idViaCol.innerHTML = item.via;
    fechaCol.innerHTML = item.fecha;

    fila.appendChild(codigoAgenteCol)
    console.log("entra");
    fila.appendChild(idViaCol);
    fila.appendChild(fechaCol);

    table.appendChild(fila);
}

function borrarFilas() {
    var table = document.getElementById("myTableM");
    var rows = table.getElementsByTagName("tr");
    while (rows.length > 1) {
        table.deleteRow(1);
    }
}

function buscar() {
    mensaje = document.getElementById('mensaje')
    mensaje.innerHTML = ""
    
    if (buscadorInput.value != "") {
        
        borrarFilas()

        if (comboBox.selectedIndex == 0) {
      
            buscarAgente()
        } else {

            buscarVia()
        }
    } else {

        mensaje.innerHTML = "El campo está vacio"
    }
}

function buscarAgente() {
    getAgentesHistorial(buscadorInput.value)
}

function buscarVia() {
    getViaHistorial(parseInt(buscadorInput.value))
}





