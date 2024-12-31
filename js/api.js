const API_KEY = '20a4face45fe80d4f1fbdbc036af24f4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherAPI {
    static async fetchWeather(city, units = 'metric') {
        try {
            const url = `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}&lang=ua`;
            // console.log(`Fetching: ${url}`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch weather for ${city}:`, error);
            return null;
        }
    }

    static async fetchForecast(city, units = 'metric') {
        try {
            const response = await fetch(`${BASE_URL}/forecast?q=${city}&units=${units}&appid=${API_KEY}&lang=ua`);
            if (!response.ok) {
                throw new Error(`Failed to fetch forecast for ${city}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default WeatherAPI;