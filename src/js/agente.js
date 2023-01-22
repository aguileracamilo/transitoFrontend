var nombreInput;
var experienciaInput;
var codigoInput;
var codigoSecretariaInput;
var codigoAgenteSeleccionado = "";

var mensajeNombre;
var mensajeExperiencia;
var mensajeCodigo;
var mensajeCodigoExperiencia;

document.addEventListener('DOMContentLoaded', function () {
    agregarEventoBotones();
    agregarEventosFilas();
    seleccionarFilaMTabla();
    getAgentes("encabezado");
    getVias();
    inicializarInputs();
    vaciarFormulario();
});
/*
window.addEventListener('load', function () {
    agregarEventoBotones();
    agregarEventosFilas();
    getAgentes();
    inicializarInputs();
    vaciarFormulario();
});
*/

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
    let botonActualizarAgente = document.getElementById('btn-actualizar')
    botonActualizarAgente.addEventListener('click', actualizarAgente)
    let botonBorrarAgente = document.getElementById('btn-borrar')
    botonBorrarAgente.addEventListener('click', borrarAgente)
    let botonLimpiar = document.getElementById('btn-limpiar')
    botonLimpiar.addEventListener('click', vaciarFormulario)
}
function vaciarFormulario() {
    nombreInput.value = "";
    experienciaInput.value = "";
    codigoInput.value = "";
    codigoSecretariaInput.value = "";
    const selectedRows = document.querySelectorAll("tr.color-fondo");
    for (let i = 0; i < selectedRows.length; i++) {
        selectedRows[i].classList.remove("color-fondo")
    }
    idViaSeleccionada = ""

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

function actualizarFilaAgente(item) {

    codigo = (codigoAgenteSeleccionado != "") ? codigoAgenteSeleccionado : codigoInput.value;
    let filas = document.querySelectorAll("#myTable tr");

    for (let i = 0; i < filas.length; i++) {
        if (filas[i].cells[2].innerHTML == codigo) {
            filas[i].cells[0].innerHTML = item.nombre
            filas[i].cells[1].innerHTML = item.experienciaAnios
            filas[i].cells[2].innerHTML = item.codigo
            filas[i].cells[3].innerHTML = item.codigoSecretaria
            filas[i].cells[4].innerHTML = item.viaAsignada
        }
    }
    codigoAgenteSeleccionado = item.codigo
}
function eliminarDeTabla(text) {
    if (codigoInput.value.trim() == "") {

        codigoInput.classList.add("corregir")
        mensajeCodigo.innerHTML = "El campo está vacío"
        resultado = false
    } else {
        codigo = (codigoAgenteSeleccionado != "") ? codigoAgenteSeleccionado : codigoInput.value;
        let filas = document.querySelectorAll("#myTable tr");
        if (text == 'error') {
            alert('No se pudo eliminar')
        } else {
            for (let i = 0; i < filas.length; i++) {
                if (filas[i].cells[2].innerHTML == codigoInput.value) {
                    filas[i].remove();

                }
            }
            codigoAgenteSeleccionado = ""
            alert(text)
        }
    }
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
                codigoAgenteSeleccionado = ""
            } else {
                const currentSelectedRow = table.querySelector(".color-fondo");
                if (currentSelectedRow) {
                    currentSelectedRow.classList.remove("color-fondo");
                }
                llenarFormulario(newSelectedRow);
                buscarEnTabla(newSelectedRow.cells[4].innerHTML);
                codigoAgenteSeleccionado = newSelectedRow.cells[2].innerHTML;
                idViaSeleccionada = newSelectedRow.cells[4].innerHTML;
                newSelectedRow.classList.add("color-fondo");
            }
        }
    });
}
function llenarFormulario(fila) {

    nombreInput.value = fila.cells[0].innerHTML;
    experienciaInput.value = fila.cells[1].innerHTML;
    codigoInput.value = fila.cells[2].innerHTML;
    codigoSecretariaInput.value = fila.cells[3].innerHTML;


}
