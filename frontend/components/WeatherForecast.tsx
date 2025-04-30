type Forecast = {
  date: string
  icon: string
  min: number
  max: number
}

type Props = {
  forecasts: Forecast[]
  unit: 'metric' | 'imperial'
}

export default function WeatherForecast({ forecasts, unit }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {forecasts.map((f, idx) => (
        <div key={idx} className="card p-4 bg-base-100 shadow-sm text-center">
          <p className="text-sm text-gray-500">{f.date}</p>
          <img src={f.icon} alt="forecast icon" className="h-12 w-12 mx-auto" />
          <p>{f.min}° / {f.max}°{unit === 'metric' ? 'C' : 'F'}</p>
        </div>
      ))}
    </div>
  )
}
