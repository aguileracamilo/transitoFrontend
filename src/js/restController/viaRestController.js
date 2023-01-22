url = 'http://192.168.101.77:8080/';

function getVias(tabla) {

    fetch(url + 'TodasVias')
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            for (const item of data) {
                agregarRegistrosAtablaVia(item,tabla);

            }
        })
        .catch(error => {
            console.log(error);
        });
}

function registrarVia() {

    if (estaViaCompleta()) {
        const agentesList = listarAgentesAsignados();

        fetch(url + 'RegistrarVia', {
            method: 'POST',
            headers: {
                'id_via': parseInt(identificadorInput.value),
                'tipo_via': tipoBox.value,
                'tipo_calle': tipoCalleBox.value,
                'numero_ruta': parseInt(numeroInput.value),
                'nivel_congestion': parseFloat(nivelCongestionInput.value),
                'agentes': agentesList
            }
        })
            .then(respuesta => respuesta.text()).then(text => {
                if (text != "error" && text != "Ya existe" && text != "Algun dato esta mal") {
                    agregarRegistrosAtablaVia({
                        'idVia': identificadorInput.value,
                        'tipoVia': tipoBox.options[tipoBox.selectedIndex].text.toUpperCase().split(' ').join('_'),
                        'tipoCalle': tipoCalleBox.options[tipoCalleBox.selectedIndex].text.toUpperCase().split(' ').join('_'),
                        'numeroRuta': numeroInput.value,
                        'nivelCongestion': nivelCongestionInput.value
                    },"encabezado")
                    actualizarTablaAsignados(identificadorInput.value)
                }
                alert(text)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function actualizarVia() {
    if (estaViaCompleta()) {
        const agentesList = listarAgentesAsignados();

        console.log(agentesList)

        fetch(url + 'ActualizarVia', {
            method: 'POST',
            headers: {
                'id_nueva': parseInt(identificadorInput.value),
                'id_via': (idViaSeleccionada == 0) ? parseInt(identificadorInput.value) : idViaSeleccionada,
                'tipo_via': tipoBox.value,
                'tipo_calle': tipoCalleBox.value,
                'numero_ruta': parseInt(numeroInput.value),
                'nivel_congestion': parseFloat(nivelCongestionInput.value),
                'agentes': agentesList
            }
        })
            .then(respuesta => respuesta.text()).then(text => {
                if (text != "error" && text != "Ya existe" && text != "Algun dato esta mal") {
                    actualizarFilaVia({
                        'idVia': identificadorInput.value,
                        'tipoVia': tipoBox.options[tipoBox.selectedIndex].text.toUpperCase().split(' ').join('_'),
                        'tipoCalle': tipoCalleBox.options[tipoCalleBox.selectedIndex].text.toUpperCase().split(' ').join('_'),
                        'numeroRuta': numeroInput.value,
                        'nivelCongestion': nivelCongestionInput.value
                    })
                    actualizarTablaAsignados(identificadorInput.value)
                }
                alert(text)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function borrarVia() {
    fetch(url + 'EliminarVia', {
        method: 'POST',
        headers: {
            'id_via': identificadorInput.value,
        }
    })
        .then(respuesta => respuesta.text()).then(text => {
            eliminarViaDeTabla(text)
            borrarAsignado(identificadorInput.value) 
            vaciarFormulario()
        })
        .catch(error => {
            console.error('Error:', error);
        });
}