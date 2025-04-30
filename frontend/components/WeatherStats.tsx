

import React from 'react';

// Define the types for the props this component expects
type Props = {
  windSpeed: number;          // Raw speed 
  windDirection: number;      // Raw direction 
  humidity: number;           // Percentage
  unit: 'metric' | 'imperial'; // To determine display units
};

// Helper function to convert degrees to cardinal direction
function degreesToCardinal(deg: number): string {
    // Ensure degrees are within 0-359 range
    const normalizedDeg = ((deg % 360) + 360) % 360;
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    // Each direction covers 22.5 degrees (360 / 16)
    // Closest direction index
    const index = Math.round(normalizedDeg / 22.5) % 16;
    return directions[index];
}

const WeatherStats: React.FC<Props> = ({ windSpeed, windDirection, humidity, unit }) => {
  // Determine wind speed display based on unit
  const displayWindSpeed = unit === 'imperial'
    ? `${windSpeed.toFixed(1)} mph` // Value is already in mph from API
    : `${windSpeed.toFixed(1)} m/s`; // Value is already in m/s from API

  // Convert wind direction degrees to cardinal letters
  const displayWindDirection = degreesToCardinal(windDirection);

  return (
    // Using grid with 2 columns now as per previous examples and wireframe hint
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 p-4 bg-base-200 rounded-lg shadow">
        {/* Wind Status Card */}
        <div className="card bg-base-100 p-4 text-center shadow">
             <h3 className="text-lg font-medium text-gray-600 mb-2">Wind Status</h3>
             <p className="text-3xl font-semibold mb-1">{displayWindSpeed}</p>
             <p className="text-sm text-gray-500">Direction: {displayWindDirection}</p>
             {/* Optional: You could add a dynamic wind direction icon here */}
        </div>

        {/* Humidity Card */}
         <div className="card bg-base-100 p-4 text-center shadow">
             <h3 className="text-lg font-medium text-gray-600 mb-2">Humidity</h3>
             <p className="text-3xl font-semibold mb-1">{humidity}%</p>
             {/* Optional: Add a progress bar for visual representation */}
             <progress className="progress progress-primary w-full mt-2" value={humidity} max="100"></progress>
        </div>
    </div>
  );
};

export default WeatherStats;