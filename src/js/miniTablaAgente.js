url = 'http://192.168.101.77:8080/';

function getAgentes() {
    fetch(url + 'TodosAgentes')
        .then(respuesta => respuesta.json())
        .then(data => {
            for (const item of data) {
                agregarRegistrosAMtabla(item);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function agregarRegistrosAMtabla(item) {
    var table = document.getElementById("encabezado-mini").parentNode;
    var fila = document.createElement("tr");
    var nombreCol = document.createElement("td");
    var experienceCol = document.createElement("td");
    var identificationCol = document.createElement("td");
    var secretariaCol = document.createElement("td");
    var viaCol = document.createElement("td");

    nombreCol.innerHTML = item.nombre;
    experienceCol.innerHTML = item.experienciaAnios;
    identificationCol.innerHTML = item.codigo;
    secretariaCol.innerHTML = item.codigoSecretaria;
    viaCol.innerHTML = (item.viaAsignada != 0 || item.viaAsignada != "") ? item.viaAsignada : "";

    fila.appendChild(nombreCol);
    fila.appendChild(experienceCol);
    fila.appendChild(identificationCol);
    fila.appendChild(secretariaCol);
    fila.appendChild(viaCol);
    fila.id = "fila-seleccionada";

    table.appendChild(fila);

}
function seleccionarFilaMTabla() {

    const table = document.getElementById("myTableM");
    let selectedRow = null;
    table.addEventListener("mousedown", function (e) {
        selectedRow = e.target.parentNode;
    });
    table.addEventListener("mouseup", function (e) {
        const newSelectedRow = e.target.parentNode;
        if (newSelectedRow.id !== "encabezado-mini") {
            if (newSelectedRow.classList.contains("color-fondo")) {
                newSelectedRow.classList.remove("color-fondo");
                idViaSeleccionada = ""
            } else {
                newSelectedRow.classList.add("color-fondo");
            }
        }
    }
    );
}
function buscarEnTablaA(idVia) {
    let filas = document.querySelectorAll("#scroll-vias table tr");

    console.log(idVia)
    for (let i = 0; i < filas.length; i++) {

        if (filas[i].cells[4].innerHTML == idVia) {
            idViaSeleccionada = filas[i].cells[4].innerHTML;
            filas[i].classList.add("color-fondo");
        }
        else {
            filas[i].classList.remove("color-fondo");
        }
    }

}

function listarAgentesAsignados(idVia) {
    let filas = document.querySelectorAll("#scroll-vias table tr");
    let lista = [];

    for (let i = 0; i < filas.length; i++) {
        if (identificadorInput.value == idVia) {

            lista.push(filas[i].cells[2].innerHTML);
        }
    }
    return lista;

}