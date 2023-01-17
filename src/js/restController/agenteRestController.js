url = 'http://192.168.101.77:8080/';

function getAgentes() {
    fetch(url + 'TodosAgentes')
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
function registrarAgente() {

    if (estaAgenteCompleto()) {
        fetch(url + 'RegistrarAgente', {
            method: 'POST',
            headers: {
                'nombre': nombreInput.value,
                'experiencia': parseFloat(experienciaInput.value),
                'codigo': codigoInput.value,
                'codigo_secretaria': codigoSecretariaInput.value,
                'via_asignada': (idViaSeleccionada !== "") ? idViaSeleccionada : 0,
            }
        })
            .then(respuesta => respuesta.text()).then(text => {
                if (text != "error" && text != "Ya existe") {
                    agregarRegistrosAtabla({ "nombre": nombreInput.value, "experienciaAnios": experienciaInput.value, "codigo": codigoInput.value, "codigoSecretaria": codigoSecretariaInput.value, "viaAsignada": idViaSeleccionada });
                }
                alert(text);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

}

function actualizarAgente() {
    if (estaAgenteCompleto()) {
        fetch(url + 'ActualizarAgente', {
            method: 'POST',
            headers: {
                'nombre': nombreInput.value,
                'experiencia': parseFloat(experienciaInput.value),
                'codigo': (codigoAgenteSeleccionado != "") ? codigoAgenteSeleccionado : codigoInput.value,
                'codigo_nuevo': codigoInput.value,
                'codigo_secretaria': codigoSecretariaInput.value,
                'via_asignada': (idViaSeleccionada !== "") ? idViaSeleccionada : 0,
            }
        })
            .then(respuesta => respuesta.text()).then(text => {
                actualizarFilaAgente({ "nombre": nombreInput.value, "experienciaAnios": experienciaInput.value, "codigo": codigoInput.value, "codigoSecretaria": codigoSecretariaInput.value, "viaAsignada": idViaSeleccionada });
                alert(text);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

}
function borrarAgente() {
    fetch(url + 'EliminarAgente', {
        method: 'POST',
        headers: {
            'codigo': codigoInput.value,
        }
    })
        .then(respuesta => respuesta.text()).then(text => eliminarDeTabla(text))
        .catch(error => {
            console.error('Error:', error);
        });
}