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

        cell1.innerHTML = cliente[i].dni;
        cell2.innerHTML = cliente[i].nombre;
        cell3.innerHTML = cliente[i].apellido;
        cell4.innerHTML = cliente[i].direccion;
        cell5.innerHTML = cliente[i].ciudad;
        cell6.innerHTML = cliente[i].cp;
        cell7.innerHTML = cliente[i].nacimiento;
    }

    // Mostrar la sección de detallesCliente
    document.getElementById("detallesCliente").style.display = "block";

    // Mostrar la sección de detallesCliente
    detallesCliente.style.display = "block";
}
