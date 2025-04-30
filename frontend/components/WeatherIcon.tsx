// src/components/WeatherIcon.tsx

import React from 'react';
import Image from 'next/image'; // Use Next.js Image for optimization

// Define the types for the props this component expects
type Props = {
  icon: string;         // Expecting the icon code (e.g., "01d")
  description: string;  // Expecting the weather description
};

const WeatherIcon: React.FC<Props> = ({ icon, description }) => {
  // Construct the OpenWeatherMap icon URL
  // Use @4x for higher resolution if desired and available
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="flex justify-center items-center p-4">
      <Image
        src={iconUrl}
        alt={description} // Use description for accessibility
        width={100}       // Provide explicit width
        height={100}      // Provide explicit height
        unoptimized={true} // Useful if OpenWeatherMap domain isn't configured in next.config.js
        priority // Add priority if it's above the fold (LCP)
      />
    </div>
  );
};

export default WeatherIcon;