// src/services/weatherService.ts

// Define types for the weather data returned by our API
export interface CurrentWeather {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
      main: string;
    }>;
    wind: {
      speed: number;
    };
    sys: {
      country: string;
    };
    dt: number; // Unix timestamp
  }
  
  export interface ForecastItem {
    date: string;
    temp: number;
    temp_min: number;
    temp_max: number;
    description: string;
    icon: string;
    humidity: number;
    wind_speed: number;
  }
  
  export interface WeatherData {
    current: CurrentWeather;
    forecast: ForecastItem[];
  }
  
  /**
   * Fetch weather data for a specific city
   * @param city - The city name to get weather for
   * @returns Promise with weather data
   */
  export async function fetchWeatherData(city: string): Promise<WeatherData> {
    try {
      // Adjust the URL to match your backend API endpoint
      const response = await fetch(`/api/weather/${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        // Try to parse error response
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
  
  /**
   * Convert temperature from Celsius to Fahrenheit
   * @param celsius - Temperature in Celsius
   * @returns Temperature in Fahrenheit
   */
  export function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }
  
  /**
   * Convert wind speed from m/s to mph
   * @param mps - Wind speed in meters per second
   * @returns Wind speed in miles per hour
   */
  export function mpsToMph(mps: number): number {
    return mps * 2.237;
  }
  
  /**
   * Format date for display
   * @param timestamp - Unix timestamp or date string
   * @returns Formatted date string
   */
  export function formatDate(timestamp: number | string): string {
    const date = typeof timestamp === 'number' 
      ? new Date(timestamp * 1000) 
      : new Date(timestamp);
      
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }