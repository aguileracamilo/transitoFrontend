url = 'http://192.168.101.77:8080/';

function getVias() {

    fetch(url + 'TodasVias')
        .then(respuesta => respuesta.json())
        .then(data => {
            console.log(data);
            for (const item of data) {
                agregarRegistrosAtabla(item);

            }
        })
        .catch(error => {
            console.log(error);
        });
}

function registrarVia() {
    if (estaViaCompleta()) {
        const agentesList = listarAgentesAsignados(identificadorInput.value);

        console.log(agentesList)

        fetch('http://192.168.101.77:8080/RegistrarVia', {
            method: 'POST',
            headers: {
                'id_via': Number(identificadorInput.value),
                'tipo_via': tipoBox.value,
                'tipo_calle': tipoCalleBox.value,
                'numero_ruta': Number(numeroInput.value),
                'nivel_congestion': parseInt(nivelCongestionInput.value),
                'agentes': agentesList
            }
        })
            .then(respuesta => respuesta.text()).then(text => {
                if(text != "error" && text != "Ya existe"&&text!="Algun dato esta mal"){
                    agregarRegistrosAtabla({
                        'idVia': identificadorInput.value,
                        'tipoVia': tipoBox.options[tipoBox.selectedIndex].text.toUpperCase().split(' ').join('_'),
                        'tipoCalle': tipoCalleBox.options[tipoCalleBox.selectedIndex].text.toUpperCase().split(' ').join('_'),
                        'numeroRuta': numeroInput.value,
                        'nivelCongestion':nivelCongestionInput.value
                    })
                }
                alert(text)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}