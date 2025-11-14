const urlBase = 'https:\/\/servicedesk.coppel.com\/incident\/create\/index\/category\/ID'

const ofertas = new Map([
    //Cloud Operations
    [10820, { nombre: "SCM Control" }],
    [8384, { nombre: "(ABC) Alta\/Baja\/Modificacion de Licencias en la plataforma de Azure DevOps\/Jira\/Confluence" }],
    [7902, { nombre: "ABC DNS" }],
    [3668, { nombre: "ABC  DNS Interno o Externo" }],
    [7898, { nombre: "ABC APIs" }],
    [7892, { nombre: "ABC BD (MySQL, PostgreSQL, SQL Server)" }],
    [7919, { nombre: "Upgrade BD" }],
    [7918, { nombre: "Update BD" }],
    [10397, { nombre: "Backup DB" }],
    [10399, { nombre: "Restore Backup DB" }],
    [7904, { nombre: "ABC Proxy DB" }],
    [7907, { nombre: "ABC Usuarios" }],
    [10393, { nombre: "ABC Usuario BD" }],
    [10395, { nombre: "ABC Permisos Usuario BD" }],
    [7920, { nombre: "ABC VDIs" }],
    [7915, { nombre: "ABC VCPUs" }],
    [7894, { nombre: "ABC Instance Group" }],
    [10396, { nombre: "Backup OS y\/o Snapshot" }],
    [10398, { nombre: "Restore Backup OS y\/o Snapshot" }],
    [7913, { nombre: "ABC VMs" }],
    [7901, { nombre: "ABC TAGs to VMs" }],
    [7895, { nombre: "ABC Memory VM" }],
    [7916, { nombre: "Update OS VMs" }],
    [7917, { nombre: "Upgrade OS VMs" }],
    [10392, { nombre: "ABC Usuario OS" }],
    [10394, { nombre: "ABC Permisos Usuario OS" }],
    [7893, { nombre: "ABC Cloud Storage" }],
    [3666, { nombre: "ABC Cluster Kubernetes Nube" }],
    [7891, { nombre: "ABC - Node pools Cluster Kubernetes" }],
    [7905, { nombre: "Incremento de recursos en Node Pools \/ GKE" }],
    [7911, { nombre: "Upgrade Cluster Kubernetes" }],
    [7912, { nombre: "Backup & Restore Kubernetes" }],
    [7897, { nombre: "ABC IPs Internas y Externas" }],
    [7909, { nombre: "ABC Keys" }],
    [7914, { nombre: "ABC Memoria RAM" }],
    [7908, { nombre: "ABC Permisos" }],
    [7906, { nombre: "ABC Proyectos" }],
    [7910, { nombre: "ABC Service Account o usuario" }],
    [7900, { nombre: "ABC Reglas Firewall" }],
    [7903, { nombre: "ABC Squid Proxy" }],
    [7899, { nombre: "ABC Segmentos IP Routing" }],
    [7889, { nombre: "ABC VPC y\/o subnets" }],
    [7578, { nombre: "ABC Usuarios" }],
    [11072, { nombre: "Gestion de Apps Apigee" }],
    [3674, { nombre: "ABC certificado SSL" }],
    [10365, { nombre: "ABC IAP" }],
    [7896, { nombre: "ABC BL" }],

    //Add User Distribution Groups
    [8209, { nombre: "Gesti\u00f3n de Usuarios" }],

    //Linux Operations
    [10369, { nombre: "ABC Dns On Premise" }],
    [12954, { nombre: "Alertas Eventos Herramientas de Monitoreo" }],
    [3398, { nombre: "An\u00e1lisis y diagn\u00f3stico de Sistemas Operativos linux" }],
    [6114, { nombre: "An\u00e1lisis y resoluci\u00f3n de riesgos" }],
    [8599, { nombre: "Autorizar\/instalar solicitud VU" }],
    [3403, { nombre: "Gesti\u00f3n de acceso de Sistemas Operativos linux" }],
    [3397, { nombre: "Instalaci\u00f3n y configuraci\u00f3n de Sistemas Operativos linux" }],
    [3399, { nombre: "Reporte de Logs" }],
    [3400, { nombre: "Respaldo de File system" }],
    [3401, { nombre: "Restauraci\u00f3n de File system" }]
]);

function respuestaDeteccion(respuesta) {
    for (let [key, value] of ofertas) {
        if (respuesta.toLowerCase().includes(value.nombre.toLowerCase())) {
            return key;
        }
    }
    return null;
};

function mostrarMensaje(texto, esExito = true, tiempo = 5000) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = texto;
    mensajeDiv.style.color = esExito ? 'green' : 'red';

    if (mostrarMensaje.timeoutId) {
        clearTimeout(mostrarMensaje.timeoutId);
    }

    mostrarMensaje.timeoutId = setTimeout(() => {
        mensajeDiv.textContent = '';
    }, tiempo);
}

function generarUrls(ofertaMap, respuesta) {
    if (!respuesta) {
        mostrarMensaje('Por favor, ingresa una oferta.');
        return;
    }
    const resultado = Array.from(ofertaMap.entries()).find(([key, oferta]) =>
        oferta.nombre.toLowerCase().includes(respuesta.toLowerCase())
    );
    if (resultado) {
        const [id, oferta] = resultado;
        const urlFinal = urlBase.replace('ID', id);
        mostrarMensaje(`Folio generado | ${oferta.nombre}`);
        setTimeout(() => {
            window.open(urlFinal, '_blank');
        }, 1000);
    } else {
        mostrarMensaje("No se encontró coincidencia.", false);
    }
}

document.getElementById('form-busqueda').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('input-oferta');
    const respuesta = input.value;
    generarUrls(ofertas, respuesta);
    input.value = '';
});

//IMPORTANTE Permitir la seleccion multiple de ofertas si hay varias coincidencias, el usuario elige cual desea
//Buscar la manera de implementar IA y una Base de datos SQL
//Trabajar en la deteccion de la oferta por palabras clave y no por nombre exacto
//Workflow para automatizar la creacion de tickets en Service Desk
//Crear una interfaz grafica para facilitar el uso de la herramienta
//Agregar validaciones y manejo de errores