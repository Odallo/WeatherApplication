'use client'
import { useEffect, useState } from 'react';
import SearchBox from '@/components/SearchBox';
import TemperatureToggle from '@/components/TemperatureToggle';
import WeatherIcon from '@/components/WeatherIcon';
import WeatherToday from '@/components/WeatherToday';
import WeatherForecast from '@/components/WeatherForecast';
import WeatherStats from '@/components/WeatherStats';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'fb0b3b11fe17a7a4dad0ad53ccae992e';

export default function Home() {
  const [city, setCity] = useState('Nairobi');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        // Geocode the city to get coordinates
        const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
        const geoData = await geoRes.json();
        if (!geoData.length) throw new Error('City not found');

        const { lat, lon } = geoData[0];

        // Fetch current weather
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
        );
        const weatherData = await weatherRes.json();

        // Fetch forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
        );
        const forecastData = await forecastRes.json();

        const dailyForecasts = forecastData.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 3);

        setWeather({
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          date: new Date().toLocaleDateString(),
          location: `${weatherData.name}, ${weatherData.sys.country}`,
          windSpeed: weatherData.wind.speed,
          windDirection: weatherData.wind.deg,
          humidity: weatherData.main.humidity
        });
        setForecast(
          dailyForecasts.map((item: any) => ({
            date: new Date(item.dt * 1000).toLocaleDateString(),
            icon: item.weather[0].icon,
            min: item.main.temp_min,
            max: item.main.temp_max
          }))
        );
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, unit]);

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <SearchBox city={city} setCity={setCity} />
        <TemperatureToggle unit={unit} setUnit={setUnit} />
      </div>
      {loading ? (
        <p className="text-center">Loading weather data...</p>
      ) : weather ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <WeatherIcon icon={weather.icon} description={weather.description} />
            <WeatherToday
              temperature={weather.temperature}
              description={weather.description}
              date={weather.date}
              location={weather.location}
              unit={unit}
            />
          </div>
          <WeatherStats
            windSpeed={weather.windSpeed}
            windDirection={weather.windDirection}
            humidity={weather.humidity}
          />
          <WeatherForecast forecasts={forecast} unit={unit} />
        </>
      ) : (
        <p className="text-center text-red-500">Could not load weather data.</p>
      )}
    </main>
  );
}
