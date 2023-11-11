'use strict';
require('dotenv').config();

/** Utility functions **/
function onEvent(event, selector, callback) {
    if (!event || !selector || !callback) {
      throw new Error("Missing required arguments");
    }
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
      if (!selector) {
        throw new Error("Missing required argument");
      }
      return parent.querySelector(selector);
}

/** Main code **/

const container = select('.container');
const search = select('.search-box button');
const weatherBox = select('.weather-box');
const weatherDetails = select('.weather-details');
const error404 = select('.not-found');
const image = select('.weather-box img');
const temperature = select('.weather-box .temperature');
const description = select('.weather-box .description');
const humidity = select('.weather-details .humidity span');
const wind = select('.weather-details .wind span');
const pressure = select('.weather-details .pressure span');
const visibility = select('.weather-details .visibility span');
const sunset = select('.weather-details .sunset span');
const sunrise = select('.weather-details .sunrise span');


function notFound() {
  container.style.height = '400px';
  weatherBox.style.display = 'none';
  weatherDetails.style.display = 'none';
  error404.style.display = 'block';
  error404.classList.add('fadeIn');
}

function updateWeatherData(json) {
  const main = json.main;
  const weather = json.weather[0];
  const pressurePsi = parseFloat(main.pressure) * 0.0145038;
  temperature.textContent = `${Math.round(main.temp)}°C`;
  description.textContent = weather.description;
  humidity.textContent = `${main.humidity}%`;
  wind.textContent = `${Math.round(json.wind.speed)} Km/h`;
  pressure.textContent = `${pressurePsi.toFixed(2)} psi`;
  visibility.textContent = `${Math.round(json.visibility / 1000)} Km`;
  sunset.textContent = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  sunrise.textContent = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  weatherBox.style.display = '';
  weatherDetails.style.display = '';
  weatherBox.classList.add('fadeIn');
  weatherDetails.classList.add('fadeIn');
  container.style.height = '700px';
  container.style.transition = 'height 0.5s ease-in-out';
}

async function searchWeather() {
  const APIKey = process.env.API_KEY;
  const city = document.querySelector('.search-box input').value;
  
  if (city === '') {
    return;
  }
  
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
  
    if (!response.ok) {
      notFound();
      return;
    }
    const json = await response.json();

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');
  
    const weatherImageMap = {
      'Clear': 'images/clear.png',
      'Rain': 'images/rain.png',
      'Snow': 'images/snow.png',
      'Clouds': 'images/cloud.png',
      'Haze': 'images/haze.png',
      'Mist': 'images/mist.png',
    };
  
    const weatherCondition = json.weather[0].main;
    image.src = weatherImageMap[weatherCondition] || '';
    updateWeatherData(json);
    
    console.log('searchWeather function called'); // Debugging line
  } catch (error) {
    console.error(error);
  }
}

onEvent('click', search, searchWeather);
onEvent('submit', search, searchWeather);
