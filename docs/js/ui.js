function createWeatherCard(city, weather, units) {
    const card = document.createElement('div');
    card.className = 'weather-card';
    const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

    card.innerHTML = `
        <h2>${city}</h2>
        <div>
        <p>Temperature: ${weather.main.temp}°${units === 'metric' ? 'C' : 'F'}</p>
        <p>Weather: ${weather.weather[0].description}</p>
        <p>Wind: ${weather.wind.speed} m/s, ${weather.wind.deg}°</p>
        <p>Pressure: ${weather.main.pressure} hPa</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
        </div>
        <div><img src="${iconUrl}" alt="${weather.weather[0].description}"></div>
    `;
    return card;
}

function createForecastTable(city, forecast, units) {
    if (!forecast || !forecast.list) {
        console.error(`No forecast data available for ${city}`);
        return; // Якщо дані відсутні, виходимо з функції
    }

    const tbody = document.querySelector('#forecast-table tbody');
    // tbody.innerHTML = '';
     
    // Додаємо заголовок міста
    const cityRow = document.createElement('tr');
    const cityCell = document.createElement('td');
    cityCell.colSpan = 6; // Об’єднуємо всі колонки для міста
    cityCell.textContent = `${city} - Forecast`;
    cityCell.style.fontWeight = 'bold';
    cityCell.style.fontSize = '1.2em';
    cityRow.appendChild(cityCell);
    tbody.appendChild(cityRow);


    // Group data by date
    const groupedForecast = forecast.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});
    
    // Iterate over the grouped forecast and create table rows
    Object.keys(groupedForecast).forEach(date => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        dateCell.colSpan = 5;
        dateCell.textContent = date;
        dateCell.style.fontWeight = 'bold';
        row.appendChild(dateCell);
        tbody.appendChild(row);

        // Iterate over the forecast items for this date
        groupedForecast[date].forEach(item => {
            const row = document.createElement('tr');
            const temp = `${item.main.temp}°${units === 'metric' ? 'C' : 'F'}`;
            const weather = item.weather[0].description;
            const wind = `${item.wind.speed} m/s`;
            const pressure = `${item.main.pressure} hPa`;
            
            row.innerHTML = `
                <td></td>  <!-- Empty cell for spacing -->
                <td>${temp}</td>
                <td>${weather}</td>
                <td>${wind}</td>
                <td>${pressure}</td>
            `;
            tbody.appendChild(row);
        });
    });
}


export { createWeatherCard, createForecastTable };
