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
      "Fortaleza": { price: 1999, days: 8, nights: 7 },
      "De Occidente a Oriente": { price: 2999, days: 10, nights: 8 },
      "Costa Do SAUIPE": { price: 1599, days: 8, nights: 7 },
      "Excursiones desde BUZIOS": { price: 10, days: 1, nights: 0 },
      "Rio de Janeiro": { price: 1000, days: 8, nights: 7 },
      "ARRAIAL DO CABO": { price: 1200, days: 8, nights: 7 },
      "ANGRA DOS REIS": { price: 1499, days: 8, nights: 7 },
      "BEBERIBE": { price: 1200, days: 8, nights: 7 }
    };
  
    const package = packagePrices[selectedPackage];
    const numDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const numNights = numDays - 1;
    const totalPricePerPerson = package.price * (numDays / package.days) * numPeople;
  
    return totalPricePerPerson;
  }
  