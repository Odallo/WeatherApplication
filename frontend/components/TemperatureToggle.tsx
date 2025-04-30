"use client"
import { useState } from 'react'

const TemperatureToggle = () => {
  const [unit, setUnit] = useState<'C' | 'F'>('C')

  return (
    <div className="flex gap-2 mb-4">
      <button
        className={`btn ${unit === 'C' ? 'btn-primary' : ''}`}
        onClick={() => setUnit('C')}
      >
        °C
      </button>
      <button
        className={`btn ${unit === 'F' ? 'btn-primary' : ''}`}
        onClick={() => setUnit('F')}
      >
        °F
      </button>
    </div>
  )
}
export default TemperatureToggle
