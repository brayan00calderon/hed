document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        // Validar el formulario
        if (!nombre || !email || !asunto || !mensaje) {
            mostrarMensaje('Por favor, complete todos los campos requeridos', 'error');
            return;
        }

        // Validar el formato del email
        if (!validarEmail(email)) {
            mostrarMensaje('Por favor, ingrese un correo electrónico válido', 'error');
            return;
        }

        // Aquí iría la lógica para enviar el formulario a un servidor
        // Por ahora solo mostraremos un mensaje de éxito
        mostrarMensaje('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'exito');
        contactForm.reset();
    });

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function mostrarMensaje(mensaje, tipo) {
        // Crear el elemento del mensaje
        const mensajeElement = document.createElement('div');
        mensajeElement.className = `mensaje ${tipo}`;
        mensajeElement.textContent = mensaje;

        // Agregar el mensaje al formulario
        contactForm.insertBefore(mensajeElement, contactForm.firstChild);

        // Remover el mensaje después de 5 segundos
        setTimeout(() => {
            mensajeElement.remove();
        }, 5000);
    }
}); 