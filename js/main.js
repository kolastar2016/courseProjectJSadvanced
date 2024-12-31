import WeatherAPI from './api.js';
import { createWeatherCard, createForecastTable } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const weatherContainer = document.getElementById('weather-container');
    const forecastContainer = document.getElementById('forecast-container');
    const currentWeatherBtn = document.getElementById('current-weather-btn');
    const forecastBtn = document.getElementById('forecast-btn');
    const unitToggle = document.getElementById('unit-toggle');
    const forecastTbody = document.querySelector('#forecast-table tbody');

    const cities = ['Kyiv', 'London', 'New York'];
    let units = 'metric'; // Стандартна одиниця - Цельсій

    // Функція для відображення поточної погоди
    async function displayWeather() {
        weatherContainer.innerHTML = '';
        forecastContainer.classList.add('hidden');

        try {
            // Отримуємо погоду для всіх міст паралельно
            const weatherPromises = cities.map(city => WeatherAPI.fetchWeather(city, units));
            const weatherData = await Promise.all(weatherPromises);

            // Додаємо картки погоди
            weatherData.forEach((weather, index) => {
                if (weather) {
                    const weatherCard = createWeatherCard(cities[index], weather, units);
                    weatherContainer.appendChild(weatherCard);
                }
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
            weatherContainer.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        }
    }

    // Функція для відображення прогнозу погоди
    async function displayForecast() {
        weatherContainer.innerHTML = '';
        forecastContainer.classList.remove('hidden');

        try {
            const sortedCities = [...cities].sort();
            // Отримуємо прогноз для всіх міст паралельно
            const forecastPromises = sortedCities.map(city => WeatherAPI.fetchForecast(city, units));
            const forecastData = await Promise.all(forecastPromises);

            forecastTbody.innerHTML = '';
            // Створюємо та відображаємо таблицю прогнозу для кожного міста
            forecastData.forEach((forecast, index) => {
                const city = sortedCities[index];
                if (forecast) {
                    createForecastTable(city, forecast, units);
                } else {
                    console.error(`No forecast data available for ${cities[index]}, ${cities}`);
                }
            });
        } catch (error) {
            console.error("Error fetching forecast data:", error);
            forecastContainer.innerHTML = '<p>Error fetching forecast data. Please try again later.</p>';
        }
    }

    // Обробник зміни одиниць вимірювання
    unitToggle.addEventListener('change', (e) => {
        units = e.target.value;
        displayWeather(); // Оновлюємо погоду при зміні одиниць
        if (!forecastContainer.classList.contains('hidden')) {
            displayForecast(); // Оновлюємо прогноз при зміні одиниць
        }
    });

    // Додавання обробників подій для кнопок
    currentWeatherBtn.addEventListener('click', displayWeather);
    forecastBtn.addEventListener('click', displayForecast);

    // Початковий виклик для відображення поточної погоди
    displayWeather();
});
