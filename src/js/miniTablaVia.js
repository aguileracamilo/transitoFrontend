var idViaSeleccionada = 0;

function getVias() {

    fetch(url + 'TodasVias')
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
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
function seleccionarFilaMTabla() {

    const table = document.getElementById("myTableM");
    let selectedRow = null;
    table.addEventListener("mousedown", function(e) {
      selectedRow = e.target.parentNode;
    });
    table.addEventListener("mouseup", function(e) {
      const newSelectedRow = e.target.parentNode;
      if (newSelectedRow === selectedRow && newSelectedRow.id !== "encabezado-mini") {
        if (newSelectedRow.classList.contains("color-fondo")) {
          newSelectedRow.classList.remove("color-fondo");
          idViaSeleccionada=""
        } else {
          const currentSelectedRow = table.querySelector(".color-fondo");
          if (currentSelectedRow) {
            currentSelectedRow.classList.remove("color-fondo");
          }
          idViaSeleccionada=newSelectedRow.cells[0].innerHTML;
          newSelectedRow.classList.add("color-fondo");
        }
      }
    });

}
function buscarEnTabla(idVia) {

    let filas = document.querySelectorAll("#scroll-vias table tr");

    for (let i = 0; i < filas.length; i++) {
        if (filas[i].cells[0].innerHTML == idVia) {

            idViaSeleccionada = filas[i].cells[0].innerHTML;
            filas[i].classList.add("color-fondo");
        }
        else {
            filas[i].classList.remove("color-fondo");
        }
    }
}
