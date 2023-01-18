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
    if(estaViaCompleta()){
    fetch('http://192.168.101.77:8080/RegistrarVia', {
        method: 'POST',
        headers: {
            'id_via': Number(identificadorInput.value),
            'tipo_via': tipoBox.value,
            'tipo_calle': tipoCalleBox.value,
            'numero_ruta': Number(numeroInput.value),
            'nivel_congestion': parseInt(nivelCongestionInput.value),
        }
    })
        .then(respuesta => respuesta.text()).then(text => alert(text))
        .catch(error => {
            console.error('Error:', error);
        });
    }
}