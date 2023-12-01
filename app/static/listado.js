document.addEventListener("DOMContentLoaded", function () {
    const URL = "http://127.0.0.1:5000/";

    // Obtener la lista de registros al cargar la página
    obtenerListaRegistros();

    function obtenerListaRegistros() {
        fetch(URL + 'clientes', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            mostrarRegistros(data.clientes);
        })
        .catch(error => {
            console.error('Error al obtener la lista de registros:', error);
        });
    }

    function mostrarRegistros(registros) {
        const cuerpoTablaRegistros = document.getElementById('cuerpo-tabla-registros');

        // Limpiar la tabla antes de agregar nuevos registros
        cuerpoTablaRegistros.innerHTML = "";

        if (registros.length === 0) {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'No hay registros disponibles.';
            cuerpoTablaRegistros.appendChild(mensaje);
        } else {
            registros.forEach(registro => {
                const fila = document.createElement('tr');

                const celdas = ['dni', 'nombre', 'apellido', 'direccion', 'ciudad', 'cp', 'nacimiento'];

                celdas.forEach(celda => {
                    const celdaElemento = document.createElement('td');
                    celdaElemento.textContent = registro[celda];
                    fila.appendChild(celdaElemento);
                });

                cuerpoTablaRegistros.appendChild(fila);
            });
        }
    }
});
