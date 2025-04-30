const WeatherForecast = () => {
  const forecast = [
    { day: "Thu", temp: "28°C", icon: "02d" },
    { day: "Fri", temp: "27°C", icon: "03d" },
    { day: "Sat", temp: "25°C", icon: "04d" },
  ]

  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {forecast.map(({ day, temp, icon }) => (
        <div key={day} className="card bg-base-100 p-2 text-center shadow">
          <p>{day}</p>
          <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={day} className="mx-auto" />
          <p>{temp}</p>
        </div>
      ))}
    </div>
  )
}
export default WeatherForecast
