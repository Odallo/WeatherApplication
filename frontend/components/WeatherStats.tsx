type Props = {
  windSpeed: number
  windDirection: string
  humidity: number
}

export default function WeatherStats({ windSpeed, windDirection, humidity }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="card p-2 bg-base-100 text-center">
        <h3 className="font-semibold">Wind</h3>
        <p>{windSpeed} km/h</p>
        <p>{windDirection}</p>
      </div>
      <div className="card p-2 bg-base-100 text-center">
        <h3 className="font-semibold">Humidity</h3>
        <p>{humidity}%</p>
      </div>
    </div>
  )
}
