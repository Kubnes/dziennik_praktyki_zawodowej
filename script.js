// Funkcja do pobierania prognozy pogody
function getWeatherForecast(city) {
    const apiKey = '07be6cb683595b835c2089d83f74ee1f';
    const url = `https://v1.nocodeapi.com/kubnes/ow/kekgknwEgbsloemA/byCityName?q=${city}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherData = {
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed
        };
  
        displayWeatherData(weatherData);
      })
      .catch(error => {
        console.log('Błąd podczas pobierania prognozy pogody:', error);
      });
  }
  
  // Funkcja do wyświetlania danych pogodowych
  function displayWeatherData(weatherData) {
    const weatherIconElement = document.getElementById('weatherIcon');
    const weatherDataElement = document.getElementById('weatherData');
  
    // Usunięcie poprzednich danych
    weatherIconElement.innerHTML = '';
    weatherDataElement.innerHTML = '';
  
    // Dodanie ikony pogodowej
    const weatherIconClass = getWeatherIconClass(weatherData.description);
    const weatherIcon = document.createElement('i');
    weatherIcon.className = `wi ${weatherIconClass}`;
    weatherIconElement.appendChild(weatherIcon);
  
    // Dodanie danych pogodowych
    const temperatureElement = document.createElement('p');
    temperatureElement.innerHTML = `Temperatura: ${weatherData.temperature}°C`;
    weatherDataElement.appendChild(temperatureElement);
  
    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = `Opis: ${weatherData.description}`;
    weatherDataElement.appendChild(descriptionElement);
  
    const humidityElement = document.createElement('p');
    humidityElement.innerHTML = `Wilgotność: ${weatherData.humidity}%`;
    weatherDataElement.appendChild(humidityElement);
  
    const windSpeedElement = document.createElement('p');
    windSpeedElement.innerHTML = `Prędkość wiatru: ${weatherData.windSpeed} m/s`;
    weatherDataElement.appendChild(windSpeedElement);
  }
  
  // Funkcja do pobierania klasy ikony pogodowej na podstawie opisu
  function getWeatherIconClass(description) {
    const weatherIcons = {
      'clear sky': 'wi-day-sunny',
      'few clouds': 'wi-day-cloudy',
      'scattered clouds': 'wi-cloud',
      'broken clouds': 'wi-cloudy',
      'shower rain': 'wi-showers',
      'rain': 'wi-rain',
      'thunderstorm': 'wi-thunderstorm',
      'snow': 'wi-snow',
      'mist': 'wi-fog'
    };
  
    const lowercaseDescription = description.toLowerCase();
    return weatherIcons[lowercaseDescription] || 'wi-cloud';
  }
  
  // Obsługa zdarzenia submit formularza
  const form = document.getElementById('praktykaForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Pobranie wartości wprowadzonych przez użytkownika
    const imie = document.getElementById('imie').value;
    const godziny = document.getElementById('godziny').value;
    const ocena = document.getElementById('ocena').value;
    const opinia = document.getElementById('opinia').value;
    const data = document.getElementById('data').value;
    const email = document.getElementById('email').value;
  
    // Utworzenie nowego wpisu
    const newEntry = document.createElement('li');
    newEntry.innerHTML = `
      <p><strong>Imię i nazwisko:</strong> ${imie}</p>
      <p><strong>Ilość wyrobionych godzin:</strong> ${godziny}</p>
      <p><strong>Ocena pracy ucznia:</strong> ${ocena}</p>
      <p><strong>Opinia na temat ucznia:</strong> ${opinia}</p>
      <p><strong>Data zamieszczenia wpisu:</strong> ${data}</p>
    `;
  
    // Dodanie nowego wpisu do listy
    const wpisyUczniowElement = document.getElementById('wpisyUczniow');
    wpisyUczniowElement.appendChild(newEntry);
  
    // Wyczyszczenie wartości wprowadzonych w formularzu
    form.reset();
  });
  
  // Inicjalizacja pobrania prognozy pogody dla Gliwic
  getWeatherForecast('Gliwice');
  