interface WeatherData {
    status: string;
    city: string;
    country: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  }
  
  export const fetchWeather = async (city: string): Promise<WeatherData> => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const res = await fetch(`${BACKEND_URL}/weather?city=${city}`);
    const rawText = await res.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      throw new Error('Invalid JSON response from server');
    }

    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    return data.weather;
  };