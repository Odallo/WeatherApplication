// src/components/Forecast.tsx
import React from 'react';
import WeatherCard from './WeatherCard';

interface ForecastItem {
  date: string;
  temp: number;
  icon: string;
  description: string;
}

interface ForecastProps {
  forecast: ForecastItem[];
  unit: 'metric' | 'imperial';
}

const Forecast: React.FC<ForecastProps> = ({ forecast, unit }) => {
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {forecast.map((day, index) => {
        const date = new Date(day.date);
        const formattedDate = date.getDate() + ' ' + 
          date.toLocaleDateString('en-US', { month: 'short' });
        
        return (
          <WeatherCard key={index}>
            <div className="flex flex-col items-center p-4">
              <div className="text-sm font-medium mb-2">{formattedDate}</div>
              
              <div className="w-12 h-12 my-2">
                <img 
                  src={`http://openweathermap.org/img/wn/${day.icon}.png`} 
                  alt={day.description}
                  className="w-full h-full"
                />
              </div>
              
              <div className="text-lg font-semibold mt-2">
                {Math.round(day.temp)}{unitSymbol}
              </div>
            </div>
          </WeatherCard>
        );
      })}
    </div>
  );
};

export default Forecast;