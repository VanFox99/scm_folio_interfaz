// ===== minutas-gen.js — Generador de Minutas para cliente mail =====
// Logo Softtek embebido en base64
const SOFTTEK_LOGO_B64 = 'data:image/png;base64,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';

// ===== EXTRAER PUNTOS TRATADOS =====
function extraerPuntosTratados(contenidoHTML) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contenidoHTML;
    const puntos = [];

    function procesarNodos(nodos) {
        nodos.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'P' || node.tagName === 'LI') {
                    const texto = (node.innerText || node.textContent || '').trim();
                    if (texto && !puntos.includes(texto)) puntos.push(texto);
                }
                if (node.childNodes.length > 0) procesarNodos(Array.from(node.childNodes));
            } else if (node.nodeType === Node.TEXT_NODE) {
                const texto = (node.textContent || '').trim();
                if (texto.length > 3 && !puntos.includes(texto)) puntos.push(texto);
            }
        });
    }
    procesarNodos(Array.from(tempDiv.childNodes));
    return puntos;
}

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ===== GENERAR HTML DE MINUTA =====
function generarHTMLMinuta(titulo, fecha, puntos, asistentes) {

    const puntosRows = puntos.length > 0
        ? puntos.map((p, i) =>
            '<tr>' +
            '<td style="padding:10px 12px 10px 0;vertical-align:top;width:24px;color:#888;font-size:13px;font-family:Arial,sans-serif;border-bottom:1px solid #f0f0f0;">' + (i+1) + '.</td>' +
            '<td style="padding:10px 12px 10px 4px;color:#333;font-size:13px;font-family:Arial,sans-serif;line-height:1.5;border-bottom:1px solid #f0f0f0;">' + escHtml(p) + '</td>' +
            '</tr>'
          ).join('')
        : '<tr><td colspan="2" style="padding:10px 0;color:#aaa;font-size:13px;font-family:Arial,sans-serif;font-style:italic;">Sin puntos registrados</td></tr>';

    const asisRows = asistentes.length > 0
        ? asistentes.map(a =>
            '<tr><td style="padding:6px 0;font-size:13px;font-family:Arial,sans-serif;color:#444;border-bottom:1px solid #f5f5f5;">' +
            '<span style="color:#888;margin-right:8px;">&#x2022;</span>' + escHtml(a.trim()) +
            '</td></tr>'
          ).join('')
        : '<tr><td style="padding:6px 0;color:#aaa;font-size:13px;font-family:Arial,sans-serif;font-style:italic;">Sin asistentes registrados</td></tr>';

    const logoSrc = SOFTTEK_LOGO_B64;

    return '<!DOCTYPE html>' +
'<html lang="es"><head><meta charset="UTF-8">' +
'<title>Minuta | ' + escHtml(titulo) + '</title>' +
'<style>' +
'body{margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;}' +
'.wrap{background:#f5f5f5;padding:32px 16px;}' +
'.card{background:#fff;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:4px;overflow:hidden;}' +
'.btn-copy{background:#1a73e8;color:#fff;border:none;padding:12px 28px;font-size:14px;border-radius:4px;cursor:pointer;margin:0 auto 20px;display:block;font-family:Arial,sans-serif;font-weight:bold;}' +
'.btn-copy:hover{background:#1558b0;}' +
'.hint{background:#fff3cd;border:1px solid #ffc107;border-radius:4px;padding:14px 18px;max-width:600px;margin:0 auto 20px;font-size:13px;color:#856404;font-family:Arial,sans-serif;line-height:1.5;}' +
'.hint strong{display:block;margin-bottom:4px;font-size:14px;}' +
'@media print{.no-print{display:none !important;}}' +
'</style></head><body>' +

'<div class="wrap">' +

'<div class="hint no-print">' +
'<strong>&#9432; ¿Cómo enviar esta minuta por tu cliente mail?</strong>' +
'Haz clic en el botón azul para copiar el contenido. Luego ve a tu cliente mail &rarr; Redactar &rarr; pega (Ctrl+V) en el cuerpo. El logo y el formato se conservan automáticamente.' +
'</div>' +

'<button class="btn-copy no-print" onclick="copiarMinuta()">&#x2398; Copiar contenido de la minuta</button>' +

'<div id="card" class="card">' +

  '<!-- LOGO -->' +
  '<div style="padding:28px 32px 20px 32px;border-bottom:1px solid #e8e8e8;">' +
    '<img src="' + logoSrc + '" alt="Softtek" style="height:48px;width:auto;display:block;" />' +
  '</div>' +

  '<!-- BARRA SEPARADORA -->' +
  '<div style="height:3px;background:linear-gradient(90deg,#00aeef 0%,#0072ce 100%);"></div>' +

  '<!-- TÍTULO Y FECHA -->' +
  '<div style="padding:24px 32px 16px 32px;">' +
    '<p style="margin:0 0 6px;font-size:12px;color:#888;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;">Minuta de Reunión</p>' +
    '<p style="margin:0 0 10px;font-size:20px;font-weight:bold;color:#222;font-family:Arial,sans-serif;line-height:1.3;">' + escHtml(titulo) + '</p>' +
    '<p style="margin:0;font-size:13px;color:#666;font-family:Arial,sans-serif;">Fecha: ' + escHtml(fecha) + '</p>' +
  '</div>' +

  '<div style="margin:0 32px;height:1px;background:#e8e8e8;"></div>' +

  '<!-- PUNTOS TRATADOS -->' +
  '<div style="padding:20px 32px 8px 32px;">' +
    '<p style="margin:0 0 12px;font-size:11px;font-weight:bold;color:#00aeef;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;">Puntos Tratados</p>' +
    '<table style="width:100%;border-collapse:collapse;">' + puntosRows + '</table>' +
  '</div>' +

  '<div style="margin:8px 32px 0;height:1px;background:#e8e8e8;"></div>' +

  '<!-- ASISTENTES -->' +
  '<div style="padding:20px 32px 8px 32px;">' +
    '<p style="margin:0 0 12px;font-size:11px;font-weight:bold;color:#00aeef;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;">Asistentes</p>' +
    '<table style="width:100%;border-collapse:collapse;">' + asisRows + '</table>' +
  '</div>' +

  '<div style="margin:8px 32px 0;height:1px;background:#e8e8e8;"></div>' +

  '<!-- SALUDOS CORDIALES -->' +
  '<div style="padding:20px 32px 28px 32px;">' +
    '<p style="margin:0;font-size:13px;color:#444;font-family:Arial,sans-serif;line-height:1.6;">' +
      'Saludos cordiales,<br>' +
      '<span style="color:#888;font-size:12px;">Si tienen alguna pregunta o comentario sobre la minuta, por favor no duden en responder a este correo, así como añadir cualquier aporte adicional.</span>' +
    '</p>' +
  '</div>' +

'</div>' + // /card

'</div>' + // /wrap

'<script>' +
'function copiarMinuta() {' +
'  var el = document.getElementById("card");' +
'  var range = document.createRange();' +
'  range.selectNodeContents(el);' +
'  var sel = window.getSelection();' +
'  sel.removeAllRanges();' +
'  sel.addRange(range);' +
'  try {' +
'    document.execCommand("copy");' +
'    alert("\u2713 Contenido copiado. Ve a tu cliente mail, crea un correo y pega (Ctrl+V) en el cuerpo.");' +
'  } catch(e) {' +
'    alert("Selecciona el contenido de la tarjeta blanca y copia con Ctrl+C.");' +
'  }' +
'  sel.removeAllRanges();' +
'}' +
'</script>' +

'</body></html>';
}

// ===== ABRIR MODAL =====
function abrirModalMinuta() {
    const notasDiv = document.getElementById('notas');
    const contenido = (notasDiv.innerText || '').trim();

    if (!contenido || contenido === 'Escribe o pega tus notas aquí...') {
        mostrarMensaje('\u2717 No hay contenido en las notas.', false);
        return;
    }

    const hoy = new Date().toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('minuta-fecha').value = hoy;

    const puntos = extraerPuntosTratados(notasDiv.innerHTML);
    const previewDiv = document.getElementById('puntos-preview');
    previewDiv.innerHTML = puntos.length > 0
        ? puntos.map(p => '<div class="punto-item">' + escHtml(p) + '</div>').join('')
        : '<div class="punto-item" style="color:var(--text-muted)">Se usará el texto tal como está.</div>';

    document.getElementById('modal-minuta').classList.add('active');
}

// ===== GENERAR Y ABRIR EN NUEVA PESTAÑA =====
function enviarMinuta() {
    const titulo = document.getElementById('minuta-titulo').value.trim();
    const fecha  = document.getElementById('minuta-fecha').value;

    if (!titulo) {
        const inp = document.getElementById('minuta-titulo');
        inp.focus();
        inp.style.borderColor = 'var(--accent-red)';
        setTimeout(() => { inp.style.borderColor = ''; }, 2000);
        return;
    }

    const notasDiv = document.getElementById('notas');
    const puntos   = extraerPuntosTratados(notasDiv.innerHTML);
    const puntosFinales = puntos.length > 0
        ? puntos
        : (notasDiv.innerText || '').split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const asistentesRaw = document.getElementById('minuta-destinatarios').value.trim();
    const asistentes    = asistentesRaw
        ? asistentesRaw.split(',').map(s => s.trim()).filter(Boolean)
        : [];

    const htmlContent = generarHTMLMinuta(titulo, fecha, puntosFinales, asistentes);

    const ventana = window.open('', '_blank');
    if (!ventana) {
        mostrarMensaje('\u26a0 El navegador bloqueó el popup. Permite popups para este sitio.', false, 7000);
        return;
    }
    ventana.document.open();
    ventana.document.write(htmlContent);
    ventana.document.close();

    mostrarMensaje('\u2713 Minuta abierta en nueva pestaña. Copia y pega en tu cliente mail.', true, 6000);
    cerrarModal();

    notasDiv.innerHTML = '';
    addPlaceholder(notasDiv);
}

function cerrarModal() {
    document.getElementById('modal-minuta').classList.remove('active');
    document.getElementById('minuta-titulo').value = '';
    document.getElementById('minuta-destinatarios').value = '';
    document.getElementById('toggle-preview').checked = false;
    document.getElementById('puntos-preview').classList.remove('visible');
}

// ===== EVENTOS =====
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-generar-minuta').addEventListener('click', abrirModalMinuta);
    document.getElementById('btn-modal-close').addEventListener('click', cerrarModal);
    document.getElementById('btn-modal-cancel').addEventListener('click', cerrarModal);

    document.getElementById('modal-minuta').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modal-minuta')) cerrarModal();
    });

    document.getElementById('btn-enviar-minuta').addEventListener('click', enviarMinuta);

    document.getElementById('toggle-preview').addEventListener('change', (e) => {
        document.getElementById('puntos-preview').classList.toggle('visible', e.target.checked);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarModal();
    });
});