import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        const apiKey = 'b8b5745dfe405987504056d3d47ca27c'; // Your actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            console.log(`Fetching weather for: ${city}`);
            const response = await axios.get(url);
            console.log('Response data:', response.data);
            setWeather(response.data);
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeather(null);
            setError('Could not fetch weather data. Please try again.');
        }
    };

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={city} 
                    onChange={handleChange} 
                    placeholder="Enter city" 
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weather && (
                <div>
                    <h3>{weather.name}</h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Condition: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
