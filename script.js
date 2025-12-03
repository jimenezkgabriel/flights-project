class Flight {
  airlineName = '';
  flightNumber = '';
  departureTime = ''
  arrivalTime = '';
  origin = '';
  destination = '';
  flightStatus = '';
  flightClass = ['Economy', 'Business', 'First Class', `🍺`];
  constructor(airlineName, flightNumber, departureTime, arrivalTime, origin, destination, flightStatus) {
    this.airlineName = airlineName;
    this.flightNumber = flightNumber;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.origin = origin;
    this.destination = destination;
    this.flightStatus = flightStatus;
  }
}

let flightList = [];

const flightBtn = document.getElementById('fetchFlights');
const flights = document.getElementById('list');
const errorMsg = document.getElementById('error');
const filterInput = document.getElementById('flightFilter');
const spinner = document.getElementById('spinner');

const fetchFlights = async () => {
  try {
    spinner.classList.remove('visually-hidden');
    const response = await new Promise(resolve => setTimeout(() => resolve(fetch('https://api.aviationstack.com/v1/flights?access_key=9148abe185ad8a93706dba95d104ad58')), 7000));
    const data = await response.json();
    console.log(data);
    flightList = data.data.map(flight =>
      new Flight(
        flight.airline.name, flight.flight.number == null ? '--' : flight.flight.number, flight.departure.scheduled, flight.arrival.scheduled, flight.departure.iata, flight.arrival.iata, flight.flight_status
      ));
    displayFlights(flightList);
  }
  catch (error) {
    console.error('Error fetching flight data:', error);
    displayFlights([]);
    return;
  }
  finally {
    spinner.classList.add('visually-hidden');
  }
}

flightBtn.addEventListener('click', fetchFlights);

const displayFlights = (flightList) => {
  flights.innerHTML = '';
  errorMsg.classList.add('d-none');

  if (flightList.length < 1) {
    errorMsg.classList.remove('d-none');
    return;
  }

  flightList.forEach(flight => {
    const flightItem = document.getElementById('template').cloneNode(true);
    flightItem.removeAttribute('id');
    flightItem.classList.remove('visually-hidden');

    flightItem.querySelector('.airline').textContent = flight.airlineName === `empty` ? '--' : flight.airlineName;
    flightItem.querySelector('.flightnumber').textContent = flight.flightNumber;
    flightItem.querySelector('.flight-time').textContent = `${new Date(flight.departureTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}, ${new Date(flight.arrivalTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    flightItem.querySelector('.flight-route').textContent = `${flight.origin} → ${flight.destination}`;

    const timeDiff = new Date(flight.arrivalTime) - new Date(flight.departureTime);
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    flightItem.querySelector('.flight-duration').textContent = `${hours}h ${minutes}m`;
    flightItem.querySelector('.flight-sub').textContent = flight.flightStatus.toUpperCase().charAt(0) + flight.flightStatus.slice(1);
    flightItem.querySelector('.flight-class').textContent = flight.flightClass[Math.floor(Math.random() * flight.flightClass.length)];
    flights.appendChild(flightItem);
  })
}

filterInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredFlights = flightList.filter(flight =>
    flight.airlineName.toLowerCase().includes(searchTerm) ||
    flight.flightNumber.toLowerCase().includes(searchTerm) ||
    flight.origin.toLowerCase().includes(searchTerm) ||
    flight.destination.toLowerCase().includes(searchTerm) ||
    flight.flightStatus.toLowerCase().includes(searchTerm)
  );

  displayFlights(filteredFlights);
});

const sortAirlineBtn = document.getElementById('sort-airline-az');
sortAirlineBtn.addEventListener('click', (e) => {
  if (e.target.classList.contains('a-z')) {
    e.target.classList.remove('a-z');
    e.target.classList.add('z-a');
    e.target.textContent = 'Sort by Airline (Z-A)';
    const sortedFlights = [...flightList].sort((a, b) => a.airlineName.localeCompare(b.airlineName));
    displayFlights(sortedFlights);
  } else {
    e.target.classList.remove('z-a');
    e.target.classList.add('a-z');
    e.target.textContent = 'Sort by Airline (A-Z)';
    const sortedFlights = [...flightList].sort((a, b) => b.airlineName.localeCompare(a.airlineName));
    displayFlights(sortedFlights);
  }
});

ocument.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  if (!toggleButton) {
    console.log("Theme toggle button not found.");
    return;
  }

  function toggleTheme() {
    const currentTheme = body.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    body.setAttribute("data-theme", newTheme);

    if (newTheme === "dark") {
      toggleButton.textContent = "☀️ Light";
    } else {
      toggleButton.textContent = "🌙 Dark";
    }

    console.log("Theme changed to:", newTheme);
  }

  const startingTheme = body.getAttribute("data-theme") || "light";
  toggleButton.textContent =
    startingTheme === "light" ? "🌙 Dark" : "☀️ Light";

  toggleButton.addEventListener("click", toggleTheme);
});