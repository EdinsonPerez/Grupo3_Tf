// Espera a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene una referencia al contenedor donde se agregarán las tarjetas
  var cardContainer = document.querySelector(".row");

  // Carga el JSON de un archivo externo
  fetch("https://restcountries.com/v3/all")
      .then((response) => response.json())
      .then((data) => {
          // Filtra y limita los datos a 8 elementos
          const countries = data.slice(0, 4);

          // Itera sobre los países y crea tarjetas para cada uno
          countries.forEach((country) => {
              const flag = country.flags[0]; // La URL de la bandera
              const name = country.name.common;
              const capital = country.capital[0];
              const currency = country.currencies[Object.keys(country.currencies)[0]].name;

              // Crea una tarjeta y agrega los datos
              const card = document.createElement('div');
              card.classList.add('card');

              const cardHeader = document.createElement('div');
              cardHeader.classList.add('card-header');
              const flagImage = document.createElement('img');
              flagImage.src = flag;
              cardHeader.appendChild(flagImage);

              const cardBody = document.createElement('div');
              cardBody.classList.add('card-body');

              const cardTitle = document.createElement('h1');
              cardTitle.classList.add('card-title');
              cardTitle.textContent = name;

              const cardInfo = document.createElement('p');
              cardInfo.textContent = `Capital: ${capital}, Moneda: ${currency}`;

              const cardButton = document.createElement('a');
              cardButton.href = './servicios.html'; // Agrega el enlace adecuado
              cardButton.classList.add('btn');
              cardButton.textContent = 'VER MÁS';

              cardBody.appendChild(cardTitle);
              cardBody.appendChild(cardInfo);
              cardBody.appendChild(cardButton);

              card.appendChild(cardHeader);
              card.appendChild(cardBody);

              // Agrega la tarjeta al contenedor de tarjetas
              cardContainer.appendChild(card);
          });
          
      })
      .catch((error) => {
          console.error('Error al cargar los datos:', error);
      });
});

document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
  });
});

document.getElementById("quotation-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Obtén los valores del formulario
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const numPeople = parseInt(document.getElementById("num-people").value);
  const selectedPackage = document.getElementById("selected-package").value;

  // Calcula el costo total
  const costoTotal = calcularCostoTotal(startDate, endDate, numPeople, selectedPackage);

  // Muestra el resultado en la página
  const quotationResult = document.getElementById("quotation-result");
  quotationResult.innerHTML = "El costo total es: $" + costoTotal.toFixed(2);
});

function calcularCostoTotal(startDate, endDate, numPeople, selectedPackage) {
  const packagePrices = {
    "Nauru": { price: 1999, days: 8, nights: 7 },
    "Guadeloupe": { price: 2999, days: 10, nights: 8 },
    "Bolivia": { price: 1599, days: 8, nights: 7 },
    "South Korea": { price: 1000, days: 6, nights: 5 }
  }

  const package = packagePrices[selectedPackage];
  const numDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  const numNights = numDays - 1;
  const totalPricePerPerson = package.price * (numDays / package.days) * numPeople;

  return totalPricePerPerson;
}

document.addEventListener("DOMContentLoaded", function () {
  const modoOscuroButton = document.getElementById("modo-oscuro");
  const body = document.body;

  modoOscuroButton.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
  });
});
