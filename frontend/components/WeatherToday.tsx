const WeatherToday = () => {
  return (
    <div className="card p-4 bg-base-100 shadow-md">
      <h2 className="text-xl font-bold">Nairobi, KE</h2>
      <p className="text-sm text-gray-500">Wed, April 30</p>
      <div className="flex items-center gap-4 mt-2">
        <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="icon" />
        <div>
          <h3 className="text-4xl font-bold">26°C</h3>
          <p className="text-gray-600">Sunny</p>
        </div>
      </div>
    </div>
  )
}
export default WeatherToday
