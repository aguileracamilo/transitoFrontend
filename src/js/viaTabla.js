
function agregarRegistrosAtablaVia(item,tabla) {
    var table = document.getElementById(tabla).parentNode;
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