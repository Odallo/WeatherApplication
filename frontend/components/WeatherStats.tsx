const WeatherStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="card bg-base-100 p-3">
        <p className="text-sm font-semibold">Wind</p>
        <p className="text-lg">13 km/h</p>
      </div>
      <div className="card bg-base-100 p-3">
        <p className="text-sm font-semibold">Humidity</p>
        <p className="text-lg">60%</p>
      </div>
    </div>
  )
}
export default WeatherStats
