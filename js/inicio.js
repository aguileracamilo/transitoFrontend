var nombreInput ;
var experienciaInput ;
var codigoInput;
var codigoSecretariaInput ;


function getAgentes() {
    fetch('http://192.168.0.109:8080/TodosAgentes')
        .then(respuesta => respuesta.json())
        .then(data => {
            for (const item of data) {
                agregarRegistrosAtabla(item);
            }
        })
        .catch(error => {
            console.log(error);
        });
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
    viaCol.innerHTML = item.viaAsignada;

    fila.appendChild(nombreCol);
    fila.appendChild(experienceCol);
    fila.appendChild(identificationCol);
    fila.appendChild(secretariaCol);
    fila.appendChild(viaCol);
    fila.id = "fila-seleccionada";
    table.appendChild(fila);

   seleccionarFila();
}
function seleccionarFila(){
     let filas = document.querySelectorAll("#scroll-agentes table tr");
    for(let i=0; i<filas.length; i++){
        filas[i].addEventListener("click", function(){
            //Remover la clase seleccionado de todas las filas
            for(let j=0; j<filas.length; j++){
              
                filas[j].classList.remove("colorFondo");
                
            }
            //Agregar la clase seleccionado a la fila seleccionada 
             if(this.id!="encabezado"){
            this.classList.add("colorFondo");
            llenarFormulario(this);
        }

        });
    }
}

function borrarAgente(){
    fetch('http://192.168.0.109:8080/EliminarAgente', {
        method: 'POST',
        headers: {
            'codigo': codigoInput.value,
        }
    })
        .then(respuesta => respuesta.text()).then(text => alert(text))
        .catch(error => {
            console.error('Error:', error);
        });
}
function registrarAgente() {
    fetch('http://192.168.0.109:8080/RegistrarAgente', {
        method: 'POST',
        headers: {
            'nombre': nombreInput.value,
            'experiencia': parseFloat(experienciaInput.value),
            'codigo': codigoInput.value,
            'codigo_secretaria': codigoSecretariaInput.value,
            'via_asignada': 2,
        }
    })
        .then(respuesta => respuesta.text()).then(text => alert(text))
        .catch(error => {
            console.error('Error:', error);
        });

}
function llenarFormulario(fila){

    nombreInput.value=fila.cells[0].innerHTML;
    experienciaInput.value=fila.cells[1].innerHTML;
    codigoInput.value=fila.cells[2].innerHTML;
    codigoSecretariaInput.value=fila.cells[3].innerHTML;


}

function inicializarInputs(){
    nombreInput = document.getElementById("input-nombre");
    experienciaInput = document.getElementById("input-experiencia");
    codigoInput= document.getElementById("input-codigo");
    codigoSecretariaInput = document.getElementById("input-codigo-secretaria");

}

window.addEventListener('load',function () {
    //Se añanden eventos a los botones del crud
    let botonRegistrarAgente = document.getElementById('btn-registrar')
    botonRegistrarAgente.addEventListener('click', registrarAgente)
    let botonBorrarAgente = document.getElementById('btn-borrar')
    botonBorrarAgente.addEventListener('click',borrarAgente )


    inicializarInputs();
    getAgentes();

    
});