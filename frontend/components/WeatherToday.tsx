type Props = {
  temperature: number
  description: string
  date: string
  location: string
  unit: 'metric' | 'imperial'
}

export default function WeatherToday({ temperature, description, date, location, unit }: Props) {
  return (
    <div className="card p-4 bg-base-200 shadow-md">
      <h2 className="text-xl font-semibold">{location}</h2>
      <p className="text-sm text-gray-400">{date}</p>
      <div className="mt-2 text-4xl font-bold">{temperature}°{unit === 'metric' ? 'C' : 'F'}</div>
      <p className="capitalize">{description}</p>
    </div>
  )
}
