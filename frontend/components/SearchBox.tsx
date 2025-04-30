'use client'

// import Input from rippleui is removed as it does not exist
import { useState } from 'react'

type Props = {
  onSearch: (city: string) => void
}

export default function SearchBox({ onSearch }: Props) {
  const [city, setCity] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
      setCity('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full input"
      />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  )
}
