const api = {
  key: "251ab8347522ea71f86c123de7a140a1",
  base: "https://api.openweathermap.org/data/2.5/",
};
function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
const searchbox = document.querySelector(".text");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}
function getResults(query) {
  fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
    .then((forecast) => {
      return forecast.json();
    })
    .then(displayResults);
}
function displayResults(forecast) {
  let city = document.querySelector(".location .city");
  city.innerText = `${forecast.city.name}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(forecast.list[0].main.temp)}<span>°c</span>`;

  let forecast_el = document.querySelector(".current .weather");
  forecast_el.innerText = forecast.list[0].weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(
    forecast.list[0].main.temp_min
  )}°c / ${Math.round(forecast.list[0].main.temp_max)}°c`;
}
