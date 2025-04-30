type Props = {
  unit: 'metric' | 'imperial'
  setUnit: React.Dispatch<React.SetStateAction<'metric' | 'imperial'>>
}

export default function TemperatureToggle({ unit, setUnit }: Props) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setUnit('metric')}
        className={`btn ${unit === 'metric' ? 'btn-primary' : 'btn-ghost'}`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit('imperial')}
        className={`btn ${unit === 'imperial' ? 'btn-primary' : 'btn-ghost'}`}
      >
        °F
      </button>
    </div>
  )
}
