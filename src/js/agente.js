var nombreInput;
var experienciaInput;
var codigoInput;
var codigoSecretariaInput;
var codigoAgenteSeleccionado;

var mensajeNombre;
var mensajeExperiencia;
var mensajeCodigo;
var mensajeCodigoExperiencia;

/*
window.addEventListener('load', function () {
    agregarEventoBotones();
    agregarEventosFilas();
    getAgentes();
    inicializarInputs();
    vaciarFormulario();
});
*/

document.addEventListener('DOMContentLoaded', function() {
    agregarEventoBotones();
    agregarEventosFilas();
    getAgentes();
    inicializarInputs();
    vaciarFormulario();
});
function inicializarInputs() {/*
    nombreInput = document.getElementById("input-nombre");
    experienciaInput = document.getElementById("input-experiencia");
    codigoInput = document.getElementById("input-codigo");
    codigoSecretariaInput = document.getElementById("input-codigo-secretaria");

    mensajeNombre = document.getElementById("mensaje-nombre");
    mensajeExperiencia = document.getElementById("mensaje-experiencia");
    mensajeCodigo = document.getElementById("mensaje-codigo");
    mensajeCodigoExperiencia = document.getElementById("mensaje-codigo-secretaria");
    */
    nombreInput = document.querySelector("#input-nombre");
    experienciaInput = document.querySelector("#input-experiencia");
    codigoInput = document.querySelector("#input-codigo");
    codigoSecretariaInput = document.querySelector("#input-codigo-secretaria");

    mensajeNombre = document.querySelector("#mensaje-nombre");
    mensajeExperiencia = document.querySelector("#mensaje-experiencia");
    mensajeCodigo = document.querySelector("#mensaje-codigo");
    mensajeCodigoExperiencia = document.querySelector("#mensaje-codigo-secretaria");
}

function agregarEventoBotones() {
    let botonRegistrarAgente = document.getElementById('btn-registrar')
    botonRegistrarAgente.addEventListener('click', registrarAgente)
    //  let botonActualizarAgente = document.getElementById('btn-actualizar')
    //botonActualizarAgente.addEventListener('click', actualizarAgente)
    //let botonBorrarAgente = document.getElementById('btn-borrar')
    // botonBorrarAgente.addEventListener('click', borrarAgente)
}
function vaciarFormulario() {
    nombreInput.value = "";
    experienciaInput.value = "";
    codigoInput.value = "";
    codigoSecretariaInput.value = "";

}
function estaAgenteCompleto() {
    resultado = true
    blanquear();
    
    if (nombreInput.value.trim() == "") {
        nombreInput.classList.add("corregir")
        mensajeNombre.innerHTML = "El campo está vacío"
        resultado = false
    }
    if (experienciaInput.value == "") {
        experienciaInput.classList.add("corregir")
        mensajeExperiencia.innerHTML = "Carácter no válido (+,*,-,e)"
        resultado = false
    }
    if (experienciaInput.value < 0) {
        experienciaInput.classList.add("corregir")
        mensajeExperiencia.innerHTML = "No se permite un número menor a 0"
        resultado = false
    }
    if (codigoInput.value.trim() == "") {

        codigoInput.classList.add("corregir")
        mensajeCodigo.innerHTML = "El campo está vacío"
        resultado = false
    }
    if (codigoSecretariaInput.value.trim() == "") {

        codigoSecretariaInput.classList.add("corregir")
        mensajeCodigoExperiencia.innerHTML = "El campo está vacío"
        resultado = false
    }

    return resultado;
}

function blanquear() {
    nombreInput.classList.remove("corregir")
    mensajeNombre.innerHTML = ""

    experienciaInput.classList.remove("corregir")
    mensajeExperiencia.innerHTML = ""

    codigoInput.classList.remove("corregir")
    mensajeCodigo.innerHTML = ""

    codigoSecretariaInput.classList.remove("corregir")
    mensajeCodigoExperiencia.innerHTML = ""
}

function agregarRegistrosAtabla(item) {
    var table = document.getElementById("encabezado").parentNode;
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
    viaCol.innerHTML = (item.viaAsignada != 0) ? item.viaAsignada : "";

    fila.appendChild(nombreCol);
    fila.appendChild(experienceCol);
    fila.appendChild(identificationCol);
    fila.appendChild(secretariaCol);
    fila.appendChild(viaCol);
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
                idViaSeleccionada = newSelectedRow.cells[0].innerHTML;
                newSelectedRow.classList.add("color-fondo");
            }
        }
    });
}