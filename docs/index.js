const urlBase = "https:\/\/servicedesk.coppel.com\/incident\/create\/index\/category\/ID";
const protocol = window.location.protocol + '//';
const arrayPaginas = [
    { nombre: "ppm", url: "ppm.softtek.com/" },
    { nombre: "azure", url: "dev.azure.com/" },
    { nombre: "azure-portal", url: "portal.azure.com/" },
    { nombre: "jira", url: "coppelmx.atlassian.net/jira/" },
    { nombre: "gcp-console", url: "console.cloud.google.com/" },
    { nombre: "aws-console", url: "d-9067d0f523.awsapps.com/start/#/?tab=accounts/" },
    { nombre: "git-hub", url: "github.com/enterprises/coppel/" },
    { nombre: "softtek-home", url: "onesofttek.sharepoint.com/sites/home/" },
    { nombre: "dev-guide", url: "sites.google.com/coppel.com/developers/" },
    { nombre: "arq-integracion", url: "sites.google.com/coppel.com/arq-integracion/" },
    { nombre: "arq-ti", url: "sites.google.com/coppel.com/daetid" },
    { nombre: "ambientacion-guide", url: "docs.google.com/document/d/1SIyBbmwZJlzyvFkoyQtqtWBWWpt2vs4eu0_oD3U8Kw8/edit?tab=t.0" },
    { nombre: "gestion-practicas", url: "sites.google.com/coppel.com/smo/pr%C3%A1cticas/" }
];

const ofertas = new Map([
    //Cloud Operations
    [10820, { nombre: "SCM Control", tags: ["scm control", "scmcontrol", "scm"] }],
    [8384, { nombre: "(ABC) Alta\/Baja\/Modificacion de Licencias en la plataforma de Azure DevOps\/Jira\/Confluence", tags: ["azure devops", "azure", "jira", "confluence"] }],
    [7902, { nombre: "ABC DNS", tags: ["modificar dns", "modificar dominio"] }],
    [3668, { nombre: "ABC  DNS Interno o Externo", tags: ["dns", "dns interno", "dns externo"] }],
    [7898, { nombre: "ABC APIs", tags: ["api", "apis", "extension"] }],
    [7892, { nombre: "ABC BD (MySQL, PostgreSQL, SQL Server)", tags: ["base de datos", "bd", "mysql", "postgresql", "sql server", "modificar bd", "modificar base de datos"] }],
    [7919, { nombre: "Upgrade BD", tags : ["upgrade bd", "mejorar bd", "mejorar base de datos", "version bd", "version base de datos"] }],
    [7918, { nombre: "Update BD", tags : ["actualizar bd", "actualizar base de datos" ] }],
    [10397, { nombre: "Backup DB", tags: ["backup db", "respaldo db", "respaldo base de datos"] }],
    [10399, { nombre: "Restore Backup DB", tags: ["restore backup db", "restaurar respaldo db", "restaurar respaldo base de datos"] }],
    [7904, { nombre: "ABC Proxy DB", tags: ["proxy db", "proxy base de datos"] }],

    [7907, { nombre: "ABC Usuarios", tags: ["usuarios", "usuario"] }],
    [10393, { nombre: "ABC Usuario BD", tags: ["usuario bd", "usuario base de datos", "usuarios", "usuario"] }],
    [10395, { nombre: "ABC Permisos Usuario BD", tags: ["permisos usuario bd", "permisos usuario base de datos", "pg_hba", "pghba", "pg hba"] }],
    [7920, { nombre: "ABC VDIs", tags: ["vdi", "vdii", "escritorio virtual"] }],
    [7915, { nombre: "ABC VCPUs", tags: ["vcpu", "vcpus", "cpu virtual"] }],
    [7894, { nombre: "ABC Instance Group", tags: ["instance group", "grupo de instancias"] }],
    [10396, { nombre: "Backup OS y\/o Snapshot", tags: ["backup os", "snapshot", "respaldo sistema operativo", "imagen", "respaldo os"] }],
    [10398, { nombre: "Restore Backup OS y\/o Snapshot", tags: ["restore os", "restaurar respaldo", "recuperar snapshot", "restaurar os"] }],
    [7913, { nombre: "ABC VMs", tags: ["vm", "virtual machine", "maquina virtual", "servidor virtual", "crear vm", "borrar vm"] }],
    [7901, { nombre: "ABC TAGs to VMs", tags: ["etiquetas vm", "tags vm", "etiquetar servidor", "tagging"] }],
    [7895, { nombre: "ABC Memory VM", tags: ["ram vm", "memoria vm", "aumentar ram", "recursos vm", "memoria"] }],
    [7916, { nombre: "Update OS VMs", tags: ["actualizar os", "parches", "update sistema operativo", "linux", "windows", "patching"] }],
    [7917, { nombre: "Upgrade OS VMs", tags: ["upgrade os", "version sistema operativo", "subir version", "migrar os"] }],
    [10392, { nombre: "ABC Usuario OS", tags: ["usuario os", "user os", "cuenta sistema operativo", "acceso servidor", "crear usuario"] }],
    [10394, { nombre: "ABC Permisos Usuario OS", tags: ["permisos os", "sudo", "root", "admin", "privilegios", "acceso root"] }],
    [7893, { nombre: "ABC Cloud Storage", tags: ["storage", "almacenamiento", "bucket", "disco nube", "espacio"] }],
    [3666, { nombre: "ABC Cluster Kubernetes Nube", tags: ["k8s", "kubernetes", "cluster", "aks", "gke", "eks", "contenedor"] }],
    [7891, { nombre: "ABC - Node pools Cluster Kubernetes", tags: ["node pool", "nodos", "workers", "grupo de nodos"] }],
    [7905, { nombre: "Incremento de recursos en Node Pools \/ GKE", tags: ["escalar nodos", "mas recursos k8s", "cpu nodos", "memoria nodos", "gke recursos"] }],
    [7911, { nombre: "Upgrade Cluster Kubernetes", tags: ["actualizar k8s", "version kubernetes", "upgrade cluster", "actualizar cluster"] }],
    [7912, { nombre: "Backup & Restore Kubernetes", tags: ["velero", "backup k8s", "restaurar k8s", "respaldo cluster", "snapshot k8s"] }],
    [7897, { nombre: "ABC IPs Internas y Externas", tags: ["ip address", "direccion ip", "ip publica", "ip privada", "reservar ip", "static ip"] }],
    [7909, { nombre: "ABC Keys", tags: ["llaves", "ssh keys", "claves", "access keys", "credenciales", "key pair"] }],
    [7914, { nombre: "ABC Memoria RAM", tags: ["ram", "memoria", "aumentar memoria", "recursos", "memory"] }],
    [7908, { nombre: "ABC Permisos", tags: ["iam", "roles", "accesos", "privilegios", "policies", "permisos nube"] }],
    [7906, { nombre: "ABC Proyectos", tags: ["projects", "gcp project", "azure subscription", "crear proyecto", "borrar proyecto", "resource group"] }],
    [7910, { nombre: "ABC Service Account o usuario", tags: ["sa", "service account", "cuenta de servicio", "cuenta tecnica", "robot account"] }],
    [7900, { nombre: "ABC Reglas Firewall", tags: ["firewall rules", "puertos", "abrir puerto", "bloquear ip", "reglas de red", "security group", "alcance"] }],
    [7903, { nombre: "ABC Squid Proxy", tags: ["proxy", "squid", "whitelist", "blacklist", "acceso internet", "navegacion"] }],
    [7899, { nombre: "ABC Segmentos IP Routing", tags: ["rutas", "routing", "enrutamiento", "segmento de red", "cidr", "tabla de ruteo"] }],
    [7889, { nombre: "ABC VPC y\/o subnets", tags: ["vpc", "red virtual", "subnet", "subred", "network", "vnet"] }],
    [7578, { nombre: "ABC Usuarios", tags: ["users", "altas", "bajas", "cuentas", "acceso"] }],
    [11072, { nombre: "Gestion de Apps Apigee", tags: ["apigee", "api gateway", "proxies", "developer portal", "api management"] }],
    [3674, { nombre: "ABC certificado SSL", tags: ["ssl", "tls", "certificado", "https", "seguridad web", "renovar certificado"] }],
    [10365, { nombre: "ABC IAP", tags: ["iap", "identity aware proxy", "acceso remoto", "tunnel", "bastion"] }],
    [7896, { nombre: "ABC BL", tags: ["load balancer", "balanceador de carga", "lb", "trafico", "alb", "nlb"] }],

    //Add User Distribution Groups
    [8209, { nombre: "Gesti\u00f3n de Usuarios", tags: ["active directory", "ad", "grupos", "permisos", "altas usuarios", "listas de distribucion"] }],

    //Linux Operations
    [6967, { nombre: "Alta de regla de comunicaci\u00f3n a redes protegidas", tags: ["alcance onpremise", "regla onpremise", "onpermise"] }],
    [10369, { nombre: "ABC Dns On Premise", tags: ["dns local", "bind", "named", "zona dns", "registros dns"] }],
    [12954, { nombre: "Alertas Eventos Herramientas de Monitoreo", tags: ["monitoreo", "alertas", "nagios", "zabbix", "grafana", "eventos", "notificaciones"] }],
    [3398, { nombre: "An\u00e1lisis y diagn\u00f3stico de Sistemas Operativos linux", tags: ["troubleshooting", "diagnostico", "error linux", "analisis so", "fallo sistema"] }],
    [6114, { nombre: "An\u00e1lisis y resoluci\u00f3n de riesgos", tags: ["seguridad", "vulnerabilidades", "hardening", "riesgos", "auditoria"] }],
    [8599, { nombre: "Autorizar\/instalar solicitud VU", tags: ["vu", "ventana unica", "instalar software", "paqueteria", "solicitud cambio"] }],
    [3403, { nombre: "Gesti\u00f3n de acceso de Sistemas Operativos linux", tags: ["acceso linux", "ssh", "login", "permisos usuario", "sudoers", "claves acceso"] }],
    [3397, { nombre: "Instalaci\u00f3n y configuraci\u00f3n de Sistemas Operativos linux", tags: ["instalar linux", "configurar servidor", "provisionamiento", "setup", "rhel", "ubuntu"] }],
    [3399, { nombre: "Reporte de Logs", tags: ["logs", "bitacora", "syslog", "var log", "auditoria logs", "journalctl"] }],
    [3400, { nombre: "Respaldo de File system", tags: ["backup fs", "respaldo archivos", "tar", "rsync", "copia seguridad"] }],
    [3401, { nombre: "Restauraci\u00f3n de File system", tags: ["restore fs", "recuperar archivos", "restaurar carpeta", "backup restore"] }],
    [3385, { nombre: "Respaldos de Base de Datos", tags: ["backup bd onpremise", "respaldo bd onpremise", "respaldo onpremise bd", "bd onpremise"] }]
]);

function respuestaDeteccion(respuestaLower) {
    for (let [key, value] of ofertas) {
        if (respuestaLower.includes(value.nombre.toLowerCase())) {
            return key;
        }
        if (value.tags.some(tag => respuestaLower.includes(tag.toLowerCase()))) {
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

function generarUrls(ofertas, respuestaLower) {
    if (!respuestaLower) {
        mostrarMensaje('Por favor, ingresa una oferta.');
        return;
    }
    const resultado = [...ofertas.entries()].find(([id, oferta]) =>
        oferta.nombre.toLowerCase().includes(respuestaLower) ||
        oferta.tags.some(tag => tag.toLowerCase().includes(respuestaLower))
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

function redireccionMenu(nombrePagina) {
    const pagina = arrayPaginas.find(p => p.nombre === nombrePagina);
    if (pagina && pagina.url) {
        window.open(protocol + pagina.url, '_blank');
    } else {
        mostrarMensaje("Página no encontrada", false);
    }
}

function copiarNota() {
    const notas = document.getElementById('notas');
    notas.select();
    navigator.clipboard.writeText(notas.value);
    mostrarMensaje("Nota copiada");
    notas.value = '';
}

//Evento principal
document.getElementById('form-busqueda').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('input-oferta');
    const respuestaLower = input.value.toLowerCase();
    generarUrls(ofertas, respuestaLower);
    input.value = '';
});

//IMPORTANTE Permitir la seleccion multiple de ofertas si hay varias coincidencias, el usuario elige cual desea, mostrar listado