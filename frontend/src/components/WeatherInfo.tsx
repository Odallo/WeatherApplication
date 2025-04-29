// src/components/WeatherInfo.tsx
import React from 'react';
import WeatherCard from './WeatherCard';

interface WeatherInfoProps {
  title: string;
  value: string | number;
  unit?: string; 
  // For humidity this would be '%', for wind speed 'km/h' or 'mph'
  showProgressBar?: boolean;
  progressValue?: number; // Value between 0-100 for progress bar
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ 
  title, 
  value, 
  unit = '', 
  showProgressBar = false,
  progressValue = 0
}) => {
  return (
    <WeatherCard title={title}>
      <div className="p-4 flex flex-col items-center">
        <div className="text-2xl font-bold mb-2">
          {value} {unit}
        </div>
        
        {showProgressBar && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${progressValue}%` }}
              aria-valuenow={progressValue}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        )}
      </div>
    </WeatherCard>
  );
};

export default WeatherInfo;