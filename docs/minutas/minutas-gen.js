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

// Función para generar la minuta en PDF
function generarMinuta() {

    // Obtener el contenido de la zona de notas
    const notasDiv = document.getElementById('notas');
    const contenidoHTML = notasDiv.innerHTML; // Contenido con formato
    const textoPlano = notasDiv.innerText; // Contenido sin formato (solo texto)

    // Datos de la minuta
    const titulo = prompt("Ingrese el título de la reunión:");
    const asistentes = prompt("Ingrese los asistentes en formato Gmail (En su defectoseparados por comas):");
    const puntosTratados = notasDiv.getAttribute('data-puntos-tratados') || '';

    // Objeto constructor MinutaTemplate
    const minuta = new MinutaTemplate(
        "./images/softtek_logo.jpeg", // Ruta del logotipo
        titulo,
        undefined, // Fecha predeterminada
        asistentes.split(','), // Convertir asistentes a un array
        puntosTratados.split(',') // Convertir puntos tratados a un array
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
            const safePuntosTratados = minuta.puntosTratados.join(', ') || "Sin puntos tratados";
            
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
            pdf.text(safePuntosTratados, 10, logoY + logoHeight + 40);
            // asistentes
            pdf.text("Asistentes:", 10, logoY + logoHeight + 150);
            pdf.text(safeAsistentes, 10, logoY + logoHeight + 160);

            // Guardar el PDF
            const sanitizedTitle = minuta.titulo.replace(/[\/\\?%*:|"<>]/g, '-');
            pdf.save(`${sanitizedTitle}.pdf`);

            notasDiv.innerHTML = '';
        };

    } catch (error) {
        console.error("Error al agregar la imagen al PDF:", error);
    }
    mostrarMensaje('Minuta generada', esExito = true, tiempo = 3000)
};

document.addEventListener('DOMContentLoaded', () => {
    const botonGenerarMinuta = document.getElementById("btn-generar-minuta");
    botonGenerarMinuta.addEventListener("click", generarMinuta);
    
});