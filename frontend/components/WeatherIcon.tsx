type Props = {
  iconUrl: string
  alt?: string
}

export default function WeatherIcon({ iconUrl, alt }: Props) {
  return (
    <img src={iconUrl} alt={alt || 'weather icon'} className="w-20 h-20" />
  )
}
