import { useState } from 'react';
import { fetchWeather } from '../src/services/weatherService';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

const Weather = () => {
  const [city, setCity] = useState('Nairobi');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('City name cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>
      
      {error && <div className="error">{error}</div>}
      
      {weather && (
        <div className="weather-info">
          <h2>{weather.city}, {weather.country}</h2>
          <div className="weather-main">
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
              alt={weather.description}
            />
            <div>
              <p className="temperature">{Math.round(weather.temperature)}°C</p>
              <p className="description">{weather.description}</p>
            </div>
          </div>
          <div className="weather-details">
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.windSpeed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;