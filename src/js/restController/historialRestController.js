url = 'http://192.168.101.79:8080/';

function getAgentesHistorial(codigo) {

    fetch(url + 'AgenteHistorial', {
        method: 'GET',
        headers: {'codigo':codigo }
    })
        .then(respuesta => respuesta.json())
        .then(data => {

            for (const item of data) {
                agregarRegistrosAtablaHistorial(item)
    
            }
    
        })
        .catch(error => {
            console.log(error);
        });
}

function getViaHistorial(idVia) {
    fetch(url + 'ViaHistorialPorId',{
        method:'GET',
        headers:{'id_via':idVia}
    })
        .then(respuesta => respuesta.json())
        .then(data => {
            for (const item of data) {
                agregarRegistrosAtablaHistorial(item)
            }
        })
        .catch(error => {
            console.log(error);
        });
}
function getViaHistorialPorDireccion(numeroRuta) {
    fetch(url + 'ViaHistorial',{
        method:'GET',
        headers:{'tipo_calle':comboBoxCalleCarrera.value, 'numero_ruta':numeroRuta}
    })
        .then(respuesta => respuesta.json())
        .then(data => {
            for (const item of data) {
                agregarRegistrosAtablaHistorial(item)
            }
        })
        .catch(error => {
            console.log(error);
        });
}