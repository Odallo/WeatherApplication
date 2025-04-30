const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export async function fetchCityCoordinates(city: string) {
  if (!API_KEY) throw new Error('Missing OpenWeatherMap API key')

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error(`No location found for city: ${city}`)
    }

    const { lat, lon, name, country, state } = data[0]
    return { lat, lon, name, country, state }
  } catch (err) {
    console.error('🌍 Geocoding error:', err)
    return null
  }
}
