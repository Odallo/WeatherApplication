// src/components/UnitToggle.tsx
import React from 'react';

interface UnitToggleProps {
  unit: 'metric' | 'imperial';
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center space-x-2 p-2">
      <span className={`text-sm ${unit === 'metric' ? 'font-bold' : ''}`}>°C</span>
      <button
        onClick={onToggle}
        className="btn btn-outline btn-sm"
        aria-label={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
      >
        {unit === 'metric' ? '°F' : '°C'}
      </button>
    </div>
  );
};

export default UnitToggle;