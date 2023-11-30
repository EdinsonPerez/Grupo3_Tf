document.addEventListener("DOMContentLoaded", function () {
    // Cargar la lista de clientes al cargar la página
    cargarListaClientes();

    // Evento para manejar la modificación de un cliente
    document.getElementById("admin-formulario").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        // Llamada a la API para modificar el cliente
        modificarCliente(formData);
    });
});

function cargarListaClientes() {
    fetch("/clientes")
        .then(response => response.json())
        .then(data => {
            // Actualizar el contenido del contenedor de la lista de clientes
            document.getElementById("admin-lista-registros").innerHTML = generarListaHTML(data.clientes);
        })
        .catch(error => console.error("Error al cargar la lista de clientes:", error));
}

function modificarCliente(formData) {
    const dni = formData.get("dni");

    fetch(`/clientes/${dni}`, {
        method: "PUT",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Actualizar la lista después de modificar el cliente
            cargarListaClientes();

            // Limpiar el formulario después de la modificación
            document.getElementById("admin-formulario").reset();

            console.log(data.mensaje);
        })
        .catch(error => console.error("Error al modificar el cliente:", error));
}

function generarListaHTML(clientes) {
    // Generar el HTML para mostrar la lista de clientes
    let html = "<ul>";

    clientes.forEach(cliente => {
        html += `<li>${cliente.nombre} ${cliente.apellido} - <button onclick="eliminarCliente(${cliente.dni})">Eliminar</button></li>`;
    });

    html += "</ul>";

    return html;
}

function eliminarCliente(dni) {
    fetch(`/clientes/${dni}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            // Actualizar la lista después de eliminar el cliente
            cargarListaClientes();

            console.log(data.mensaje);
        })
        .catch(error => console.error("Error al eliminar el cliente:", error));
}
