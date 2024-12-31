# courseProjectJSadvanced

# Weather Forecast App

This is a simple weather forecast app that fetches weather data from the OpenWeatherMap API and displays it in a user-friendly interface. It shows the current weather and a 5-day weather forecast for multiple cities. The app allows the user to toggle between Celsius and Fahrenheit.

## Features

- **Current Weather**: Displays the current temperature, weather description, wind speed, pressure, sunrise, and sunset for multiple cities.
- **5-Day Forecast**: Displays the weather forecast for the next 5 days, including temperature, weather description, wind speed, and pressure for each day.
- **City Sorting**: Cities are displayed in alphabetical order when showing the 5-day forecast.
- **Temperature Unit Toggle**: Users can switch between Celsius and Fahrenheit units for temperature.

## Project Structure

The project consists of the following files:

### `index.html`
- Contains the HTML structure of the weather app, including buttons to toggle between current weather and the 5-day forecast, and a table to display forecast data.

### `style.css`
- Contains the styling for the weather app. The design is responsive and works well on various screen sizes.

### `main.js`
- Handles the application logic, including fetching weather data, displaying weather cards, and handling user interactions.

### `api.js`
- Contains a class `WeatherAPI` responsible for fetching weather data from the OpenWeatherMap API for both the current weather and the 5-day forecast.

### `ui.js`
- Contains functions for rendering weather data on the page, including creating weather cards for current weather and a table for the 5-day forecast.

## How It Works

### 1. **Fetching Weather Data**

The app fetches weather data from the [OpenWeatherMap API](https://openweathermap.org/). It uses the following two endpoints:

- **Current Weather**: `/weather?q={city}&units={units}&appid={API_KEY}`
- **5-Day Forecast**: `/forecast?q={city}&units={units}&appid={API_KEY}`

You will need to replace `{API_KEY}` with your own API key from OpenWeatherMap.

### 2. **Displaying Weather Information**

- **Current Weather**: When the user clicks the "Current Weather" button, the app fetches the current weather for a list of predefined cities (`Kyiv`, `London`, `New York`) and displays it as a weather card. Each card shows:
  - Temperature
  - Weather description
  - Wind speed and direction
  - Atmospheric pressure
  - Sunrise and sunset times
  - A weather icon

- **5-Day Forecast**: When the user clicks the "5-Day Forecast" button, the app fetches the 5-day forecast data for each city and displays it in a table. The table groups the data by date and includes:
  - Date
  - Temperature
  - Weather description
  - Wind speed
  - Atmospheric pressure

Each city is displayed with its respective forecast, and the cities are sorted alphabetically.

### 3. **Toggle Temperature Units**

The temperature units can be toggled between Celsius and Fahrenheit. This is done by changing the unit parameter in the API request (`metric` for Celsius, `imperial` for Fahrenheit). The user can toggle between the units by clicking the buttons.

## Technologies Used

- **HTML**: For the structure of the web page.
- **CSS**: For styling the app and making it responsive.
- **JavaScript**: For fetching data from the API and manipulating the DOM.
- **OpenWeatherMap API**: To fetch weather data.

## Getting Started

### **Clone the Repository**

Clone this repository to your local machine: