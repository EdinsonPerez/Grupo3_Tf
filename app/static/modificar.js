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

// Valores originales del cliente al mostrar.
var clienteActual = null;

function mostrarDetallesCliente(cliente) {
    // Limpiar la tabla antes de agregar nuevos datos
    document.getElementById("cuerpo-tabla-registros").innerHTML = "";

    clienteActual = cliente;

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

        cell1.innerHTML = cliente[i].dni;
        cell2.innerHTML = cliente[i].nombre;
        cell3.innerHTML = cliente[i].apellido;
        cell4.innerHTML = `<div contenteditable="true" id="direccion">${cliente[i].direccion}</div>`;
        cell5.innerHTML = `<div contenteditable="true" id="ciudad">${cliente[i].ciudad}</div>`;
        cell6.innerHTML = `<div contenteditable="true" id="cp">${cliente[i].cp}</div>`;
        cell7.innerHTML = cliente[i].nacimiento;
        cell8.innerHTML = `<button onclick="guardarCambios(${cliente[i].dni})">Guardar Cambios</button>`;
    }

    // Mostrar la sección de detallesCliente
    document.getElementById("detallesCliente").style.display = "block";
}

function guardarCambios(dni) {
    var direccionNueva = document.getElementById("direccion").innerText;
    var ciudadNueva = document.getElementById("ciudad").innerText;
    var cpNuevo = document.getElementById("cp").innerText;

    // Encuentra el cliente actual por su DNI
    var clienteModificado = clienteActual.find(cliente => cliente.dni === dni);

    // Actualiza los valores modificados
    clienteModificado.direccion = direccionNueva;
    clienteModificado.ciudad = ciudadNueva;
    clienteModificado.cp = cpNuevo;

    // Realizar el POST con los cambios al servidor
    fetch(`http://127.0.0.1:5000/clientes/${dni}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            direccion: direccionNueva,
            ciu: ciudadNueva, 
            cp: cpNuevo
        })
    })
    
    .then(response => response.json())
    .then(data => {
        // Manejar los datos devueltos si es necesario
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
}