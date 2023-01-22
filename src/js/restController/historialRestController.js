url = 'http://192.168.101.77:8080/';

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
    fetch(url + 'ViaHistorial',{
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