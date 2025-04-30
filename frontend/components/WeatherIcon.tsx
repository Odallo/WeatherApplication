const WeatherIcon = ({ icon }: { icon: string }) => {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="weather icon"
      className="w-20 h-20"
    />
  )
}
export default WeatherIcon
