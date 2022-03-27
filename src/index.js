//Show chosen city temperature
function searchEngine(city) {
  let apiKey = "60d6c7645117d27721f091cb48cb8b98";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function revealCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchEngine(city);
}

let search = document.querySelector("#city-weather");
search.addEventListener("submit", revealCity);

//InnerHTML for city chosen
function showTemperature(response) {
  let temperatureApi = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature-today");
  temperature.innerHTML = `${temperatureApi}°C`;

  let location = response.data.name;
  let cities = document.querySelector("#selectCity");
  cities.innerHTML = `${location}`;

  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#forecast-weather");
  weatherDescription.innerHTML = `${description}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityWeather = document.querySelector("#humidity-level");
  humidityWeather.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//current meteo in current city
function getGeoLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "60d6c7645117d27721f091cb48cb8b98";
  let units = "metric";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(urlApi).then(getCurrentTemp);
}
navigator.geolocation.getCurrentPosition(getGeoLocation);

//InnerHTML for current geolocation city
function getCurrentTemp(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature-today");
  let location = response.data.name;
  let currentCity = document.querySelector("#selectCity");
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#forecast-weather");
  let humidity = Math.round(response.data.main.humidity);
  let humidityWeather = document.querySelector("#humidity-level");
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function currentPosition(events) {
  events.preventDefault();
  navigator.geolocation.getCurrentPosition(getGeoLocation);
}

let currentPositionWeather = document.querySelector("button");
currentPositionWeather.addEventListener("click", currentPosition);
//add current time and day
let now = new Date();

let h3 = document.querySelector("#day-week");
let dateWeek = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let daysWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayWeek = daysWeek[now.getDay()];
h3.innerHTML = `${dayWeek} ${hours}:${minutes}`;
