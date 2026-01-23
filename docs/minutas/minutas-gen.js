// Constantes y variables globales | objetos padre y clases
class MinutaTemplate {
    constructor(logotipo, titulo, fecha = new Date().toLocaleDateString('es-ES'), asistentes, puntosTratados) {
        this.logotipo = logotipo;
        this.titulo = titulo;
        this.fecha = fecha;
        this.asistentes = asistentes;
        this.puntosTratados = puntosTratados;
    }
}
// Funcion para procesamiento de puntos tratados desde HTML
function extraerPuntosTratados(contenidoHTML) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contenidoHTML;

    const puntosTratados = [];

    // Función recursiva para recorrer todos los nodos
    function procesarNodos(nodos) {
        nodos.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) { // Si es un elemento HTML
                if (node.tagName === 'P' || node.tagName === 'LI') { // Si es <p> o <li>
                    const texto = node.innerText.trim(); // Usar innerText para obtener el texto visible
                    if (texto && !puntosTratados.includes(texto)) { // Evitar duplicados
                        puntosTratados.push(texto); // Agregar al array de puntos tratados
                    }
                }
                // Procesar los hijos del nodo recursivamente
                if (node.childNodes.length > 0) {
                    procesarNodos(Array.from(node.childNodes));
                }
            }
        });
    }

    // Llamar a la función recursiva con los nodos hijos de tempDiv
    procesarNodos(Array.from(tempDiv.childNodes));

    return puntosTratados;
}

// Función para generar la minuta en PDF
function generarMinuta() {

    // Obtener el contenido de la zona de notas
    const notasDiv = document.getElementById('notas');
    const contenidoHTML = notasDiv.innerHTML; // Contenido con formato

    if (!contenidoHTML.trim()) {
        mostrarMensaje('No hay contenido en las notas para procesar.', false);
        return;
    }

    // Crear un elemento temporal para manipular el HTML
    const puntosTratados = extraerPuntosTratados(contenidoHTML);

    // Datos de la minuta
    const titulo = prompt("Ingrese el título de la reunión:");
    const asistentesInput = prompt("Ingrese los asistentes en formato Gmail (En su defectoseparados por comas):");
    const asistentes = asistentesInput ? asistentesInput.split(',') : [];

    // Objeto constructor MinutaTemplate
    const minuta = new MinutaTemplate(
        "./images/softtek_logo.jpeg", // Ruta del logo
        titulo, // Título de la minuta
        undefined, // Fecha predeterminada
        asistentes, // Array asistentes
        puntosTratados // Pasar el array de puntos tratados directamente
    );

    // Crear el PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Definir las dimensiones máximas del logo
    const maxWidth = 50; // Ancho máximo permitido para el logo
    const maxHeight = maxWidth; // Alto máximo permitido para el logo

    // Agregar logo (si aplica)
    try {
        const dataURL = minuta.logotipo; // Cambia esto por la ruta de tu logo
        const logoX = 10;
        const logoY = 10;

        // Crear una imagen para obtener las dimensiones originales
        const img = new Image();
        img.src = dataURL;
        img.onload = () => {
            // Calcular las dimensiones del logo manteniendo la proporción
            const aspectRatio = img.width / img.height;
            let logoWidth = maxWidth;
            let logoHeight = maxHeight;

            if (img.width > img.height) {
                logoHeight = maxWidth / aspectRatio;
            } else {
                logoWidth = maxHeight * aspectRatio;
            }

            // Agregar la imagen al PDF con las dimensiones calculadas
            pdf.addImage(dataURL, 'JPEG', logoX, logoY, logoWidth, logoHeight);

            const safeTitulo = minuta.titulo || "Sin título";
            const safeAsistentes = minuta.asistentes.join(', ') || "Sin asistentes";
            const safePuntosTratados = minuta.puntosTratados || "Sin puntos tratados";

            // separador
            const lineY = logoY + logoHeight;
            pdf.setDrawColor(200, 200, 200); // Color gris claro
            pdf.line(10, lineY, 200, lineY);

            // titulo
            pdf.setFont("Helvetica", "bold");
            pdf.setFontSize(12);
            pdf.text("Título:", 10, logoY + logoHeight + 10);
            pdf.text(safeTitulo, 23, logoY + logoHeight + 10);
            // fecha
            pdf.setFont("Helvetica", "normal");
            pdf.setFontSize(10);
            pdf.text(`Fecha: ${minuta.fecha}`, 10, logoY + logoHeight + 15);

            // puntos tratados
            pdf.text("Puntos tratados:", 10, logoY + logoHeight + 30);
            let yPosition = logoY + logoHeight + 40;

            if (Array.isArray(safePuntosTratados)) {
                safePuntosTratados.forEach((punto, index) => {
                    // Dividir el texto en líneas si excede el ancho de la página (máximo 180 unidades de ancho)
                    const lineas = pdf.splitTextToSize(`${index + 1}. ${punto}`, 180);

                    lineas.forEach((linea, lineaIndex) => {
                        if (yPosition > 280) { // Si la posición excede el límite de la página
                            pdf.addPage(); // Agregar una nueva página
                            yPosition = 20; // Reiniciar la posición vertical en la nueva página
                        }
                        pdf.text(linea, 10, yPosition); // Imprimir la línea

                        // Incrementar la posición vertical
                        if (lineas.length > 1 && lineaIndex < lineas.length - 1) {
                            // Si el texto está dividido en varias líneas, usar un salto de línea más pequeño
                            yPosition += 5;
                        } else {
                            // Si es la última línea o no está dividido, usar el salto de línea normal
                            yPosition += 10;
                        }
                    });
                });
            } else {
                pdf.text(safePuntosTratados, 10, yPosition); // Imprime "Sin puntos tratados" si no hay puntos
            }

            // asistentes
            yPosition += 10;
            pdf.text("Asistentes:", 10, yPosition);

            // Verificar si hay asistentes
            if (minuta.asistentes && minuta.asistentes.length > 0) {
                const lineHeight = 5; // Altura de cada línea
                const pageHeight = 297; // Altura de la página en mm (A4)
                const marginBottom = 20; // Margen inferior
                let currentY = yPosition + 10; // Posición Y inicial para los asistentes

                // Iterar sobre los asistentes y colocarlos en una sola columna
                minuta.asistentes.forEach((asistente, index) => {
                    // Si la posición Y excede el límite de la página, agregar una nueva página
                    if (currentY + lineHeight > pageHeight - marginBottom) {
                        pdf.addPage();
                        currentY = 10; // Reiniciar la posición Y en la nueva página
                        pdf.text("Asistentes (continuación):", 10, currentY);
                        currentY += 5;
                        currentY += lineHeight;
                    }

                    // Agregar el asistente en la posición actual
                    pdf.setFont("Helvetica", "normal");
                    pdf.text(`• ${asistente}`, 10, currentY);
                    currentY += lineHeight;
                });

            } else {
                // Si no hay asistentes, mostrar un mensaje
                pdf.text(safeAsistentes, 10, yPosition + 10);
            }

            // Guardar el PDF
            const sanitizedTitle = minuta.titulo.replace(/[\/\\?%*:|"<>]/g, '-');
            pdf.save(`${sanitizedTitle}.pdf`);

            notasDiv.innerHTML = '';
        };

    } catch (error) {
        console.error("Error al agregar la imagen al PDF:", error);
    }
    mostrarMensaje('Minuta generada', true, 3000);
};

document.addEventListener('DOMContentLoaded', () => {
    const botonGenerarMinuta = document.getElementById("btn-generar-minuta");
    botonGenerarMinuta.addEventListener("click", generarMinuta);

});