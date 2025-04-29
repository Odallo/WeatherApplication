// src/components/WeatherCard.tsx
import React from 'react';

interface WeatherCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  children, 
  title, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {title && (
        <div className="text-center text-xs text-gray-500 pt-2">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default WeatherCard;