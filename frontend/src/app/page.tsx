// src/app/page.tsx
'use client'; // Required for hooks like useState, useEffect

import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecast';
import WeatherCard from '@/components/WeatherCard'; // We'll use this for Wind/Humidity
import UnitToggle from '@/components/UnitToggle';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

// Define interfaces for the expected API data structure
// Based on OpenWeatherMap's /weather response + potential forecast
interface WeatherData {
  coord: { lon: number; lat: number };
  weather: {
    id: number;
    main: string; // e.g., "Clouds"
    description: string; // e.g., "overcast clouds"
    icon: string; // e.g., "04d"
  }[];
  base: string;
  main: {
    temp: number; // Temperature
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number; // Humidity %
  };
  visibility: number;
  wind: {
    speed: number; // Wind speed
    deg: number; // Wind direction
    gust?: number;
  };
  clouds: { all: number };
  dt: number; // Timestamp
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string; // City name
  cod: number;
  // We'll add forecast data structure here later if needed
  // forecast?: ForecastItemData[];
}

// interface ForecastItemData { ... } // Define later

type Units = 'metric' | 'imperial'; // metric = Celsius, imperial = Fahrenheit

export default function Home() {
  const [city, setCity] = useState<string>('Nairobi'); // Default city
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<Units>('metric'); // Default to Celsius

  // Function to fetch weather data
  const fetchWeatherData = async (selectedCity: string) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null); // Clear previous data

    // Get backend URL from environment variable or use default
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000/api';

    try {
       // Construct the API URL - encode city name for safety
       const apiUrl = `${backendUrl}/weather/${encodeURIComponent(selectedCity)}`;
       console.log(`Workspaceing data from: ${apiUrl}`); // Debug log

      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);

    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || 'Failed to fetch weather data.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch weather data on initial load for the default city
  useEffect(() => {
    fetchWeatherData(city);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means run once on mount

  // Handler for search bar submission
  const handleSearch = (searchedCity: string) => {
    setCity(searchedCity); // Update the city state
    fetchWeatherData(searchedCity); // Fetch new data
  };

   // Handler for unit change (we'll implement conversion later)
   const handleUnitChange = (newUnit: Units) => {
    setUnits(newUnit);
    // Note: We might need to re-fetch or just convert displayed values later
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-12 bg-base-200">
        {/* Main container card */}
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl p-4 sm:p-6">
        {/* Top Section: Search and Units */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
           <SearchBar onSearch={handleSearch} isLoading={isLoading} />
           {/* <UnitToggle selectedUnit={units} onUnitChange={handleUnitChange} /> */}
           {/* TODO: Implement UnitToggle Component */}
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSpinner />}

        {/* Error State */}
        {error && !isLoading && <ErrorMessage message={error} />}

        {/* Weather Data Display */}
        {!isLoading && !error && weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {/* Left Column: Current Weather */}
             <div className="md:col-span-1">
               {/* <CurrentWeather data={weatherData} unit={units} /> */}
               {/* TODO: Implement CurrentWeather Component */}
               <pre className="text-xs mt-4">{JSON.stringify(weatherData, null, 2)}</pre> {/* Temp: show raw data */}
             </div>

             {/* Right Column: Details & Forecast */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Forecast (placeholder) */}
               {/* <div className="sm:col-span-2">
                 <Forecast data={weatherData.forecast} unit={units} />
               </div> */}
               {/* TODO: Implement Forecast Component */}

               {/* Wind Status */}
               {/* <WeatherCard title="Wind Status"> */}
                  {/* TODO: Display wind data */}
               {/* </WeatherCard> */}

               {/* Humidity */}
               {/* <WeatherCard title="Humidity"> */}
                  {/* TODO: Display humidity data */}
               {/* </WeatherCard> */}

                {/* TODO: Implement remaining cards based on wireframe */}
             </div>
          </div>
        )}
      </div>
    </main>
  );
}