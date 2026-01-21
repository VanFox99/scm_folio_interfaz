class MinutaTemplate {
    constructor(logotipo, titulo, fecha = new Date().toLocaleDateString(), asistentes, puntosTratados) {
        this.logotipo = logotipo;
        this.titulo = titulo;
        this.fecha = fecha;
        this.asistentes = asistentes;
        this.puntosTratados = puntosTratados;
    }
}

function loadImageToBase64(url, callback) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Evitar problemas de CORS
    img.onload = function () {
        console.log("Imagen cargada correctamente:", url);
        const aspectRatio = img.width / img.height; // Calcula la relación de aspecto
        const maxWidth = 50; // Ancho máximo deseado
        const maxHeight = maxWidth / aspectRatio; // Calcula el alto manteniendo la proporción

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/jpeg");

        // Devuelve el dataURL y las dimensiones calculadas
        callback({ dataURL, width: maxWidth, height: maxHeight });
    };
    img.onerror = function () {
        console.error("Error al cargar la imagen:", url);
    };
    img.src = url;
}

function minutaNotas(callback) {
    const titulo = prompt("Ingrese el título de la reunión:");
    const asistentesRaw = prompt("Ingrese la lista de asistentes (IMPORTANTE formato Gmail):");
    const asistentes = asistentesRaw
        .split(',')
        .map(asistente => {
            const match = asistente.trim().match(/^(.*?)(?=<)/);
            return match ? match[1].trim() : asistente.trim();
        });

    const notas = document.getElementById('notas').value;
    if (!notas) {
        alert("Por favor, ingrese los puntos tratados en la reunión.");
        return null; // Devuelve null si no hay notas
    }
    const puntosTratados = notas.split('\n');

    const minuta = new MinutaTemplate(
        "./images/softtek_logo.jpeg", // Ruta del logotipo
        titulo,
        undefined, // Fecha predeterminada
        asistentes,
        puntosTratados
    );

    if (minuta) {
        callback(minuta); // Llama al callback con el objeto minuta
    }
}

function pasteToPDF(minuta) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const lineHeight = 5; // Altura entre líneas

    // Agregar logotipo al PDF
    console.log("Valor de minuta.logotipo:", minuta.logotipo);

    loadImageToBase64(minuta.logotipo, function ({ dataURL, width, height }) {
        try {
            // Agregar logotipo al PDF
            const logoX = 10; // Posición X del logotipo
            const logoY = 10; // Posición Y del logotipo
            pdf.addImage(dataURL, 'JPEG', logoX, logoY, width, height);
        } catch (error) {
            console.error("Error al agregar la imagen al PDF:", error);
        }

        const titleY = 10 + height + 5; // Posición Y del título (logoY + height + margen)

        // Agregar contenido al PDF
        pdf.setDrawColor(200, 200, 200); // Color gris claro
        pdf.line(10, titleY - 10, 200, titleY - 10);
        pdf.setFont("Helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setFont("Helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text("Título:", 10, titleY);
        pdf.setFont("Helvetica", "bold");
        pdf.text(minuta.titulo, 23, titleY);
        pdf.setFont("Helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text(`Fecha: ${minuta.fecha}`, 10, titleY + 10);

        pdf.text(`Puntos Tratados:`, 10, titleY + 20);

        // Configuración para manejar el salto de línea automático
        const maxWidth = 190; // Ancho máximo del texto antes de hacer un salto de línea
        let currentY = titleY + 30; // Posición Y inicial para los puntos tratados
        const puntoSpacing = 5; // Espacio entre puntos tratados

        // Iterar sobre los puntos tratados
        minuta.puntosTratados.forEach((punto, index) => {
            const puntoTexto = `${index + 1}. ${punto}`;
            const lineas = pdf.splitTextToSize(puntoTexto, maxWidth); // Dividir el texto en líneas
            lineas.forEach((linea) => {
                if (currentY > pdf.internal.pageSize.height - 20) { // Verificar si se excede el margen inferior
                    pdf.addPage(); // Agregar una nueva página
                    currentY = 10; // Reiniciar la posición Y en la nueva página
                }
                pdf.text(linea, 10, currentY); // Agregar la línea al PDF
                currentY += lineHeight; // Incrementar la posición Y
            });
            currentY += puntoSpacing; // Incrementar la posición Y después de cada punto tratado
        });

        // Verificar si hay suficiente espacio para el tema de "Asistentes"
        if (currentY > pdf.internal.pageSize.height - 115) { // Si no hay espacio suficiente
            pdf.addPage(); // Agregar una nueva página
            currentY = 120; // Reiniciar la posición Y para "Asistentes"
        } else {
            currentY = 120; // Asegurar que "Asistentes" comience en Y = 120
        }

        pdf.text(`Asistentes:`, 10, titleY + 120);
        pdf.setFontSize(10);

        // Configuración para asistentes en columnas
        const asistentesPorColumna = 18; // Número máximo de asistentes por columna
        const columna1X = 10; // Posición X de la primera columna
        const columna2X = 110; // Posición X de la segunda columna
        currentY = titleY + 130; // Posición Y inicial para los asistentes

        // Iterar sobre los asistentes y colocarlos en columnas
        minuta.asistentes.forEach((asistente, index) => {
            const columna = Math.floor(index / asistentesPorColumna); // Determinar la columna (0 o 1)
            const yPosition = currentY + (index % asistentesPorColumna) * lineHeight; // Calcular la posición Y

            // Si la posición Y excede el límite de la página, agregar una nueva página
            if (yPosition > 280) { // 280 es el límite inferior de la página (297mm - margen)
                pdf.addPage();
                currentY = 10; // Reiniciar la posición Y en la nueva página
            }

            // Determinar la posición X según la columna
            const xPosition = columna === 0 ? columna1X : columna2X;

            // Agregar viñeta y texto del asistente
            pdf.setFont("Helvetica", "normal");
            pdf.text(`• ${asistente}`, xPosition, yPosition);
        });

        pdf.save('minuta.pdf');
    });
}

function minutaGeneracion() {
    minutaNotas(minuta => {
        if (minuta) {
            pasteToPDF(minuta); // Genera el PDF
        } else {
            console.error('No se pudo generar la minuta.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const botonGenerarMinuta = document.getElementById("btn-generar-minuta");
    botonGenerarMinuta.addEventListener("click", () => {
        minutaGeneracion();
    });
});