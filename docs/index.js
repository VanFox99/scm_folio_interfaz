// ===== SCM Folio Interfaz — index.js =====
// Variables y constantes globales
const urlBase = "https://servicedesk.coppel.com/incident/create/index/category/ID";
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

// Mapa de ofertas con sus nombres y tags asociados
const ofertas = new Map([
    //Cloud Operations V2
    [10820, { nombre: "SCM Control", tags: ["scm control", "scmcontrol", "scm"] }],
    [8384, { nombre: "(ABC) Alta/Baja/Modificacion de Licencias en la plataforma de Azure DevOps/Jira/Confluence", tags: ["azure devops", "azure", "jira", "confluence"] }],
    [13268, { nombre: "IaC Reglas FW", tags: ["firewall", "alcance", "regla", "comunicacion"] }],
    [13269, { nombre: "IaC Mantto Plantillas", tags: ["modificacion", "infraestructura", "proyecto"] }],
    [13279, { nombre: "ABC Lineamientos Infraestructura Gobierno Multicloud", tags: ["lineamiento", "creacion infra", "infraestructura"] }],
    [13278, { nombre: "Auditorias Multicloud", tags: ["auditoria", "revision"] }],
    [13272, { nombre: "CaC Usuario BD", tags: ["bd", "usuario", "base de datos", "cambio contraseña", "nuevo usuario"] }],
    [13274, { nombre: "CaC Permisos Usuario BD", tags: ["permisos", "usuario", "bd", "base de datos"] }],
    [13276, { nombre: "CaC Migración Base de Datos", tags: ["migracion", "bd", "base de datos", "dump"] }],
    [13275, { nombre: "CaC Base de Datos", tags: ["load balancer", "lb", "certificado"] }],
    [13273, { nombre: "CaC Permisos Usuario OS", tags: ["IP interna", "IP externa", "IP", "reservar"] }],
    [13277, { nombre: "CaC Apps Negocio", tags: ["app", "instalar", "instalacion"] }],
    [13270, { nombre: "CaC Mantto Plantillas", tags: ["api", "instalar", "desinstalar", "modificar"] }],
    [13267, { nombre: "IaC Permisos Multicloud Console", tags: ["SA", "service account", "permiso", "permisos", "rol", "roles"] }],
    //Cloud Incident Management
    [8569, { nombre: "Degradación / Falla de Servicio VDI", tags: ["falla", "VDI"] }],
    [8568, { nombre: "Degradación / Falla de Servicio Almacenamiento", tags: ["falla", "Almacenamiento"] }],
    [8567, { nombre: "Degradación / Falla de Servicio Balanceador", tags: ["falla", "balanceador", "lb"] }],
    [8564, { nombre: "Degradación / Falla de Servicio BD", tags: ["falla", "bd", "base de datos"] }],
    [8565, { nombre: "Degradación / Falla de Servicio Cluster de Kubernetes", tags: ["falla", "kubernetes", "cluster"] }],
    [8566, { nombre: "Degradación / Falla de Servicio Comunicaciones", tags: ["falla", "comunicacion", "comunicaciones"] }],
    [8563, { nombre: "Degradación / Falla de Servicio Servidor", tags: ["falla", "servidor"] }],
    // Active Directory
    [8209, { nombre: "Gestión de Usuarios AD", tags: ["active directory", "ad", "grupos", "permisos", "altas usuarios", "listas de distribucion"] }],
    // Linux Operations
    [6967, { nombre: "Alta de regla de comunicación a redes protegidas", tags: ["alcance onpremise", "regla onpremise", "onpremise"] }],
    [10369, { nombre: "ABC Dns On Premise", tags: ["dns local", "bind", "named", "zona dns", "registros dns"] }],
    [12954, { nombre: "Alertas Eventos Herramientas de Monitoreo", tags: ["monitoreo", "alertas", "nagios", "zabbix", "grafana", "eventos", "notificaciones"] }],
    [3398, { nombre: "Análisis y diagnóstico de Sistemas Operativos linux", tags: ["troubleshooting", "diagnostico", "error linux", "analisis so", "fallo sistema"] }],
    [6114, { nombre: "Análisis y resolución de riesgos", tags: ["seguridad", "vulnerabilidades", "hardening", "riesgos", "auditoria"] }],
    [8599, { nombre: "Autorizar/instalar solicitud VU", tags: ["vu", "ventana unica", "instalar software", "paqueteria", "solicitud cambio"] }],
    [3403, { nombre: "Gestión de acceso de Sistemas Operativos linux", tags: ["acceso linux", "ssh", "login", "permisos usuario", "sudoers", "claves acceso"] }],
    [3397, { nombre: "Instalación y configuración de Sistemas Operativos linux", tags: ["instalar linux", "configurar servidor", "provisionamiento", "setup", "rhel", "ubuntu"] }],
    [3399, { nombre: "Reporte de Logs", tags: ["logs", "bitacora", "syslog", "var log", "auditoria logs", "journalctl"] }],
    [3400, { nombre: "Respaldo de File system", tags: ["backup fs", "respaldo archivos", "tar", "rsync", "copia seguridad"] }],
    [3401, { nombre: "Restauración de File system", tags: ["restore fs", "recuperar archivos", "restaurar carpeta", "backup restore"] }],
    [3385, { nombre: "Respaldos de Base de Datos", tags: ["backup bd onpremise", "respaldo bd onpremise", "respaldo onpremise bd", "bd onpremise"] }],
]);

const PLACEHOLDER_TEXT = "Escribe o pega tus notas aquí, en caso de minuta, cada punto es tomado seguido de un 'enter'...";
function mostrarMensaje(texto, esExito = true, tiempo = 5000) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = texto;
    mensajeDiv.className = esExito ? 'success' : 'error';

    if (mostrarMensaje.timeoutId) clearTimeout(mostrarMensaje.timeoutId);

    mostrarMensaje.timeoutId = setTimeout(() => {
        mensajeDiv.textContent = '';
        mensajeDiv.className = '';
    }, tiempo);
}

function removePlaceholder(element) {
    if (element.innerText.trim() === PLACEHOLDER_TEXT) {
        element.innerText = "";
        element.classList.remove("placeholder");
    }
}

function addPlaceholder(element) {
    if (element.innerText.trim() === "") {
        element.innerText = PLACEHOLDER_TEXT;
        element.classList.add("placeholder");
    }
}

// ===== FUNCIONES PRINCIPALES =====
function generarUrls(ofertas, respuestaLower) {
    if (!respuestaLower) {
        mostrarMensaje('Por favor, ingresa una oferta.', false);
        return [];
    }
    return [...ofertas.entries()].filter(([id, oferta]) =>
        oferta.nombre.toLowerCase().includes(respuestaLower) ||
        oferta.tags.some(tag => tag.toLowerCase().includes(respuestaLower))
    );
}

function abrirFolio(id) {
    window.open(urlBase.replace('ID', id), '_blank');
}

function mostrarDropdownFolios(resultados) {
    const dropdown = document.getElementById('folio-dropdown');
    dropdown.innerHTML = '';

    if (resultados.length === 0) {
        dropdown.classList.remove('visible');
        mostrarMensaje('✗ No se encontró coincidencia. Intenta con otro término.', false);
        return;
    }

    if (resultados.length === 1) {
        const [id, oferta] = resultados[0];
        mostrarMensaje(`✓ Folio generado | ${oferta.nombre}`);
        setTimeout(() => abrirFolio(id), 800);
        dropdown.classList.remove('visible');
        return;
    }

    const header = document.createElement('div');
    header.className = 'folio-results-header';
    header.textContent = `${resultados.length} coincidencias — elige una`;
    dropdown.appendChild(header);

    resultados.forEach(([id, oferta]) => {
        const item = document.createElement('div');
        item.className = 'folio-result-item';
        item.innerHTML = `<span class="folio-result-name">${oferta.nombre}</span><span class="folio-result-id">#${id}</span>`;
        item.addEventListener('click', () => {
            abrirFolio(id);
            mostrarMensaje(`✓ Abriendo folio | ${oferta.nombre}`);
            dropdown.classList.remove('visible');
            document.getElementById('input-oferta').value = '';
        });
        dropdown.appendChild(item);
    });

    dropdown.classList.add('visible');
}

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('folio-dropdown');
    if (dropdown && !dropdown.contains(e.target) && e.target.id !== 'input-oferta') {
        dropdown.classList.remove('visible');
    }
});

function redireccionMenu(nombrePagina) {
    const pagina = arrayPaginas.find(p => p.nombre === nombrePagina);
    if (pagina && pagina.url) {
        window.open(protocol + pagina.url, '_blank');
    } else {
        mostrarMensaje("Página no encontrada", false);
    }
}

function copiarNota() {
    const notasDiv = document.getElementById('notas');
    const text = notasDiv.innerText;
    if (!text || text === PLACEHOLDER_TEXT) {
        mostrarMensaje("No hay nada que copiar.", false, 3000);
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        mostrarMensaje('✓ Nota copiada en portapapeles', true, 3000);
    }).catch(() => {
        // Fallback
        const range = document.createRange();
        range.selectNodeContents(notasDiv);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        mostrarMensaje('✓ Nota copiada en portapapeles', true, 3000);
    });
}

// ===== CHAR COUNTER =====
function updateCharCount() {
    const notasDiv = document.getElementById('notas');
    const count = notasDiv.innerText.trim() === PLACEHOLDER_TEXT ? 0 : notasDiv.innerText.length;
    document.getElementById('char-count').textContent = `${count} chars`;
}

// ===== FOOTER CLOCK =====
function updateClock() {
    const now = new Date();
    document.getElementById('footer-time').textContent =
        now.toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' });
}

// ===== EVIDENCIA SCM =====
function generarTextoEvidencia() {
    const sistema      = document.getElementById('ev-sistema').value.trim();
    const actividad    = document.getElementById('ev-actividad').value.trim();
    const responsable  = document.getElementById('ev-responsable').value.trim();
    const ambiente     = document.getElementById('ev-ambiente').value;
    const estado       = document.getElementById('ev-estado').value;
    const obs          = document.getElementById('ev-observaciones').value.trim();
    const fecha        = new Date().toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' });

    if (!sistema && !actividad && !responsable) return null;

    let texto = `───────────────────────────────────────────────\n`;
    texto += `📋  CUERPO EVIDENCIA — SCM Control\n`;
    texto += `───────────────────────────────────────────────\n`;
    texto += `Fecha/Hora   : ${fecha}\n`;
    if (sistema)     texto += `Sistema      : ${sistema}\n`;
    if (actividad)   texto += `Actividad    : ${actividad}\n`;
    if (responsable) texto += `Responsable  : ${responsable}\n`;
    if (ambiente)    texto += `Ambiente     : ${ambiente}\n`;
    texto += `Estado       : ${estado}\n`;
    if (obs)         texto += `Observaciones: ${obs}\n`;
    texto += `───────────────────────────────────────────────`;
    return texto;
}

function actualizarPreviewEvidencia() {
    const preview = document.getElementById('ev-preview');
    const texto = generarTextoEvidencia();
    if (texto) {
        preview.textContent = texto;
        preview.classList.remove('empty');
    } else {
        preview.textContent = 'Completa los campos para generar el cuerpo de evidencia...';
        preview.classList.add('empty');
    }
}

// ===== EVENTOS =====
document.addEventListener('DOMContentLoaded', () => {
    // Placeholder init
    const notasDiv = document.getElementById('notas');
    if (notasDiv.innerText.trim() === "") {
        notasDiv.innerText = PLACEHOLDER_TEXT;
        notasDiv.classList.add("placeholder");
    }
    notasDiv.addEventListener('focus', () => removePlaceholder(notasDiv));
    notasDiv.addEventListener('blur', () => addPlaceholder(notasDiv));
    notasDiv.addEventListener('input', updateCharCount);

    // Copy btn
    document.getElementById('btn-copy').addEventListener('click', copiarNota);

    // Clear btn
    document.getElementById('btn-clear').addEventListener('click', () => {
        notasDiv.innerHTML = '';
        addPlaceholder(notasDiv);
        updateCharCount();
    });

    // Clock
    updateClock();
    setInterval(updateClock, 60000);

    // ===== EVIDENCIA: live preview =====
    ['ev-sistema', 'ev-actividad', 'ev-responsable', 'ev-observaciones'].forEach(id => {
        document.getElementById(id).addEventListener('input', actualizarPreviewEvidencia);
    });
    ['ev-ambiente', 'ev-estado'].forEach(id => {
        document.getElementById(id).addEventListener('change', actualizarPreviewEvidencia);
    });

    // Copiar evidencia
    document.getElementById('btn-ev-copy').addEventListener('click', () => {
        const texto = generarTextoEvidencia();
        if (!texto) { mostrarMensaje('Completa al menos un campo de evidencia.', false, 3000); return; }
        navigator.clipboard.writeText(texto).then(() => {
            mostrarMensaje('✓ Evidencia copiada en portapapeles', true, 3000);
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = texto;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            mostrarMensaje('✓ Evidencia copiada en portapapeles', true, 3000);
        });
    });

    // Abrir folio SCM Control (ID 10820)
    document.getElementById('btn-ev-folio').addEventListener('click', () => {
        window.open('https://servicedesk.coppel.com/incident/create/index/category/10820', '_blank');
    });
});

// Búsqueda form
document.getElementById('form-busqueda').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('input-oferta');
    const respuestaLower = input.value.toLowerCase().trim();
    const resultados = generarUrls(ofertas, respuestaLower);
    mostrarDropdownFolios(resultados);
    if (resultados.length !== 1) input.value = '';
});