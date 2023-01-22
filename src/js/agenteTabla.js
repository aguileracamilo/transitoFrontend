function agregarRegistrosAtablaAgente(item,tabla) {
    var table = document.getElementById(tabla).parentNode;
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