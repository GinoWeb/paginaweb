// Funcionalidad para la encuesta
document.addEventListener('DOMContentLoaded', function() {
    const encuestaBtn = document.getElementById('encuestaBtn');
    const encuestaPanel = document.getElementById('encuestaPanel');
    const encuestaForm = document.getElementById('encuestaForm');

    // Mostrar/ocultar panel de encuesta
    encuestaBtn.addEventListener('click', function() {
        encuestaPanel.classList.toggle('activo');
    });

    // Cerrar el panel al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!encuestaPanel.contains(e.target) && !encuestaBtn.contains(e.target)) {
            encuestaPanel.classList.remove('activo');
        }
    });

    // Manejar envío de encuesta
    encuestaForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Recopilar datos del formulario
        const formData = new FormData(encuestaForm);
        const resultados = {
            calidad: parseInt(formData.get('calidad')),
            servicio: parseInt(formData.get('servicio')),
            recomendacion: parseInt(formData.get('recomendacion')),
            mejoras: formData.getAll('mejoras'),
            comentarios: formData.get('comentarios')
        };

        // Calcular promedio de satisfacción
        const promedio = (resultados.calidad + resultados.servicio + resultados.recomendacion) / 3;

        // Generar PDF con los resultados
        generarPDF(resultados, promedio);

        // Mostrar mensaje de agradecimiento
        alert('¡Gracias por completar nuestra encuesta!');

        // Limpiar formulario y cerrar panel
        encuestaForm.reset();
        encuestaPanel.classList.remove('activo');
    });

    function generarPDF(resultados, promedio) {
        const docDefinition = {
            content: [
                { text: 'Resultados de la Encuesta de Satisfacción', style: 'header' },
                { text: '\n' },
                { text: 'Calificaciones:', style: 'subheader' },
                { text: `Calidad de las hamburguesas: ${resultados.calidad}/5` },
                { text: `Calidad del servicio: ${resultados.servicio}/5` },
                { text: `Nivel de recomendación: ${resultados.recomendacion}/5` },
                { text: `Promedio de satisfacción: ${promedio.toFixed(2)}/5` },
                { text: '\n' },
                { text: 'Aspectos a mejorar:', style: 'subheader' },
                { text: resultados.mejoras.join(', ') || 'Ninguno seleccionado' },
                { text: '\n' },
                { text: 'Comentarios:', style: 'subheader' },
                { text: resultados.comentarios || 'Sin comentarios' },
                { text: '\n' },
                { text: `Fecha: ${new Date().toLocaleDateString()}` }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 10, 0, 5]
                }
            }
        };

        // Generar y descargar el PDF
        pdfMake.createPdf(docDefinition).download('encuesta_satisfaccion.pdf');
    }
});