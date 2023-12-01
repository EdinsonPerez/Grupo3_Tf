document.addEventListener("DOMContentLoaded", function () {
    const URL = "http://127.0.0.1:5000/";

    const formularioModificar = document.getElementById('formulario-modificar');
    const resultadoModificacion = document.getElementById('resultado-modificacion');

    formularioModificar.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe normalmente

        const formData = new FormData(this);

        // Modificar la URL para utilizar el método PUT
        const dni = formData.get('dni');
        fetch(URL + `clientes/${dni}`, {
            method: 'PUT',
            body: formData,
            mode: 'cors', // Agrega esta línea
        })
        .then(function(response) {
            // ...
        })
        .catch(function(error) {
            console.error('Error al modificar el registro:', error);
        });
    });

    function mostrarResultado(data) {
        resultadoModificacion.textContent = data.mensaje;
        // Limpiar el formulario después de la modificación
        formularioModificar.reset();
    }
});
