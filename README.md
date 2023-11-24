# precioviajes
Sitio web de una agencia de viajes con un cotizador de paquetes turísticos desarrollado en HTML CSS y JavaScript.

Funcionalidad 

Este código tiene la funcionalidad de calcular y mostrar el costo total de un paquete turístico en función de los valores ingresados en un formulario. A continuación, te explico su funcionamiento:

- El código utiliza el método addEventListener para escuchar el evento "submit" del formulario con el id "quotation-form". Cuando el formulario se envía, se ejecuta la función que contiene el código.

- La primera línea dentro de la función, event.preventDefault();, evita que el formulario se envíe automáticamente, lo cual es el comportamiento por defecto. Esto permite que podamos controlar el proceso y realizar cálculos antes de mostrar el resultado.

- A continuación, se obtienen los valores ingresados en el formulario utilizando document.getElementById y value. Estos valores corresponden a la fecha de inicio (startDate), fecha de fin (endDate), número de personas (numPeople) y paquete seleccionado (selectedPackage).

- Luego, se llama a la función calcularCostoTotal pasando los valores obtenidos anteriormente. Esta función se encarga de calcular el costo total del paquete turístico en base a la duración del viaje, el número de personas y el precio del paquete seleccionado.

- El resultado del cálculo se muestra en la página, dentro del elemento con el id "quotation-result". Se utiliza quotationResult.innerHTML para asignar el contenido que muestra el costo total calculado.

- Por último, se define la función calcularCostoTotal que recibe los parámetros necesarios para realizar el cálculo. En esta función, se utiliza un objeto packagePrices que contiene los precios y la duración de cada paquete turístico disponible.

- Se accede al objeto package correspondiente al paquete seleccionado mediante packagePrices[selectedPackage]. Luego, se calcula el número de días y noches del viaje utilizando las fechas de inicio y fin.

- A partir de la duración del viaje, el número de personas y el precio del paquete, se calcula el costo total por persona (totalPricePerPerson).

- Finalmente, la función retorna el costo total por persona, que será mostrado en la página.

En resumen, este código permite calcular y mostrar el costo total de un paquete turístico en función de los valores ingresados en un formulario, utilizando los precios y la duración de cada paquete definidos en el objeto packagePrices

HTML Y CSS
- Los paquetes turísticos estan presentados en forma de tarjetas, cada una de ellas con detalles y fotografías que te permitirán tener una visión general de las opciones disponibles.

- Cada tarjeta de paquete turístico muestra información relevante, como el destino, la duración del viaje, las actividades incluidas y otros aspectos destacados. Además, se han incorporado estilos personalizados en CSS para resaltar la belleza visual de las tarjetas y brindar una experiencia agradable a los visitantes.

- Junto a cada tarjeta, encontrarás un botón que te llevará directamente a la página de cotización. Al hacer clic en el botón, ingresarás al cotizador de paquetes turísticos, donde podrás ingresar los detalles específicos de tu viaje, como fechas, número de personas y preferencias adicionales. A partir de esta información, se calculará automáticamente el precio estimado del paquete turístico seleccionado.
