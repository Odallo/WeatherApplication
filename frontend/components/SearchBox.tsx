'use client'
import { useState } from 'react'
import { fetchCityCoordinates } from '@/lib/geocode'

export default function SearchBox() {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    const result = await fetchCityCoordinates(city)
    console.log('📍 Location result:', result)
    setLoading(false)
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  )
}
