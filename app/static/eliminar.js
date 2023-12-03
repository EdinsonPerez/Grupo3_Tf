// modificar.js

function mostrarFormularioConsulta() {
    var formularioConsulta = document.getElementById("formulario-consulta");

    if (formularioConsulta.style.display === "none") {
        formularioConsulta.style.display = "block";
    } else {
        formularioConsulta.style.display = "none";
    }
}

function consultarCliente() {
    // Obtener el valor del DNI ingresado
    var dniConsulta = document.getElementById("dniConsulta").value;

    // Realizar la solicitud al servidor
    fetch(`http://127.0.0.1:5000/clientes/${dniConsulta}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        // Manejar los datos devueltos
        mostrarDetallesCliente(data.clientes);
    })
    .catch(error => console.error('Error:', error));
}

function mostrarDetallesCliente(cliente) {
    // Limpiar la tabla antes de agregar nuevos datos
    document.getElementById("cuerpo-tabla-registros").innerHTML = "";

    // Iterar sobre los detalles del cliente y agregarlos a la tabla
    for (var i = 0; i < cliente.length; i++) {
        var row = document.getElementById("cuerpo-tabla-registros").insertRow(i);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);  // Add a new cell for the "Eliminar Cliente" button

        cell1.innerHTML = cliente[i].dni;
        cell2.innerHTML = cliente[i].nombre;
        cell3.innerHTML = cliente[i].apellido;
        cell4.innerHTML = `<div contenteditable="true" id="direccion">${cliente[i].direccion}</div>`;
        cell5.innerHTML = `<div contenteditable="true" id="ciudad">${cliente[i].ciudad}</div>`;
        cell6.innerHTML = `<div contenteditable="true" id="cp">${cliente[i].cp}</div>`;
        cell7.innerHTML = cliente[i].nacimiento;
        cell8.innerHTML = `<button onclick="eliminarCliente(${cliente[i].dni})">Eliminar Cliente</button>`;
        cell9.innerHTML = '';  // Remove the "Guardar Cambios" button
    }

    // Mostrar la sección de detallesCliente
    document.getElementById("detallesCliente").style.display = "block";
}

function eliminarCliente(dni) {
    // Realizar la solicitud al servidor para eliminar el cliente
    fetch(`http://127.0.0.1:5000/clientes/${dni}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        // Manejar los datos devueltos
        console.log(data);
        // Mostrar mensaje de eliminación satisfactoria
        alert("Cliente eliminado satisfactoriamente.");
    })
    .catch(error => console.error('Error:', error));
}
