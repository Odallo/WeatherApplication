'use client'
import { useEffect, useState } from 'react';
import SearchBox from '@/components/SearchBox';
import TemperatureToggle from '@/components/TemperatureToggle';
import WeatherIcon from '@/components/WeatherIcon';
import WeatherToday from '@/components/WeatherToday';
import WeatherForecast from '@/components/WeatherForecast';
import WeatherStats from '@/components/WeatherStats';

export default function Home() {
  const [city, setCity] = useState('Nairobi');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);

        const response = await fetch(`http://localhost:8000/api/weather?city=${city}&unit=${unit}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Process data...
        setWeather({
          temperature: data.current.temp,
          description: data.current.weather[0].description,
          icon: data.current.weather[0].icon,
          date: new Date().toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          location: `${data.current.name}, ${data.current.sys.country}`,
          windSpeed: data.current.wind.speed,
          windDirection: data.current.wind.deg,
          humidity: data.current.main.humidity,
        });

        setForecast(
          data.forecast.list
            .filter((_: any, index: number) => index % 8 === 0)
            .slice(0, 3)
            .map((item: any) => ({
              date: new Date(item.dt * 1000).toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              }),
              icon: item.weather[0].icon,
              min: item.main.temp_min,
              max: item.main.temp_max,
            }))
        );
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to connect to the weather service');
        setWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    }

    if (city) {
      fetchWeather();
    } else {
      setWeather(null);
      setForecast([]);
      setLoading(false);
    }
  }, [city, unit]);

  const handleSearch = (searchedCity: string) => {
    setCity(searchedCity);
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <SearchBox onSearch={handleSearch} />
        <TemperatureToggle unit={unit} setUnit={setUnit} />
      </div>

      {loading ? (
        <p className="text-center animate-pulse text-blue-600">
          Loading weather data...
        </p>
      ) : weather ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
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
            unit={unit}
          />

          <WeatherForecast forecasts={forecast} unit={unit} />
        </>
      ) : (
        <p className="text-center text-red-500">
          Could not load weather data. City might not be found or API error.
        </p>
      )}

      {process.env.NODE_ENV === 'development' && (
        <pre className="text-xs bg-gray-100 p-2 mt-4 rounded overflow-x-auto">
          {JSON.stringify({ city, unit, weather, forecast }, null, 2)}
        </pre>
      )}
    </main>
  );
}