document.addEventListener('DOMContentLoaded', function() {
    updateWeather('London');
});

document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    updateWeather(location);
});

async function updateWeather(place) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=30e137edc20b43e7a6b141420242801&q=${encodeURIComponent(place)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        document.getElementById('weatherCard').style.display = 'block';
        document.getElementById('locationDisplay').textContent = data.location.name;
        document.getElementById('temperature').textContent = data.current.temp_c;
        document.getElementById('feelsLike').textContent = data.current.feelslike_c;
        document.getElementById('humidity').textContent = data.current.humidity;
        document.getElementById('windSpeed').textContent = data.current.wind_kph;

        // Update weather icon based on the returned data
        const iconUrl = '[Path to Weather Icons]/' + data.current.condition.icon;
        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.src = iconUrl;
        weatherIcon.style.display = 'block';
        
        document.getElementById('weatherDescription').textContent = data.current.condition.text;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
