// src/components/CurrentWeather.tsx
import React from 'react';

interface CurrentWeatherProps {
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  date: string;
  unit: 'metric' | 'imperial';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  city,
  country,
  temperature,
  description,
  icon,
  date,
  unit
}) => {
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col items-start justify-between gap-2">
        {/* Weather Icon */}
        <div className="w-24 h-24">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-full h-full"
          />
        </div>
        
        {/* Temperature */}
        <div className="text-4xl font-bold">
          {Math.round(temperature)}{unitSymbol}
        </div>
        
        {/* Weather Description */}
        <div className="text-xl capitalize">{description}</div>
        
        {/* Date and Location */}
        <div className="text-sm text-gray-600 mt-2">
          {formattedDate}<br />
          {city}, {country}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;