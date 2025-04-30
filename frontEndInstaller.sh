#!/bin/bash

PROJECT_NAME="weather-frontend"
APP_DIR="app"
COMPONENTS_DIR="components"
STYLES_DIR="styles"

echo "🚀 Creating Next.js + TypeScript project: $PROJECT_NAME"

npx create-next-app@latest $PROJECT_NAME --typescript --app --no-tailwind --eslint --src-dir --import-alias "@/*"

cd $PROJECT_NAME || { echo "❌ Failed to enter project directory"; exit 1; }

echo "📦 Installing Tailwind CSS, RippleUI, and dependencies..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

npm install rippleui

# Tailwind config
echo "⚙️ Configuring TailwindCSS and RippleUI..."
cat > tailwind.config.js <<'EOL'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rippleui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")],
}
EOL

# Ensure styles directory exists
mkdir -p $STYLES_DIR

# Global styles
echo "📄 Creating global styles..."
cat > $STYLES_DIR/globals.css <<'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

# Update layout to import styles
mkdir -p $APP_DIR
cat > $APP_DIR/layout.tsx <<'EOL'
import '../styles/globals.css'

export const metadata = {
  title: 'Weather App',
  description: 'Weather application using Next.js, Tailwind CSS, and RippleUI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  )
}
EOL

# Home page with layout
cat > $APP_DIR/page.tsx <<'EOL'
import SearchBox from '@/components/SearchBox'
import TemperatureToggle from '@/components/TemperatureToggle'
import WeatherToday from '@/components/WeatherToday'
import WeatherForecast from '@/components/WeatherForecast'
import WeatherStats from '@/components/WeatherStats'

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-base-200 text-base-content">
      <div className="max-w-2xl mx-auto space-y-6">
        <SearchBox />
        <TemperatureToggle />
        <WeatherToday />
        <WeatherForecast />
        <WeatherStats />
      </div>
    </main>
  )
}
EOL

# Create components
echo "📁 Creating starter components..."
mkdir -p $COMPONENTS_DIR

# SearchBox.tsx
cat > $COMPONENTS_DIR/SearchBox.tsx <<'EOL'
'use client'
import { useState } from 'react'

export default function SearchBox() {
  const [city, setCity] = useState('')

  const handleSearch = () => {
    console.log('Searching city:', city)
    // Call Geocoding API here
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}
EOL

# TemperatureToggle.tsx
cat > $COMPONENTS_DIR/TemperatureToggle.tsx <<'EOL'
'use client'
import { useState } from 'react'

export default function TemperatureToggle() {
  const [unit, setUnit] = useState<'C' | 'F'>('C')

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">Unit:</span>
      <button className={`btn btn-sm ${unit === 'C' ? 'btn-active' : ''}`} onClick={() => setUnit('C')}>°C</button>
      <button className={`btn btn-sm ${unit === 'F' ? 'btn-active' : ''}`} onClick={() => setUnit('F')}>°F</button>
    </div>
  )
}
EOL

# WeatherToday.tsx
cat > $COMPONENTS_DIR/WeatherToday.tsx <<'EOL'
export default function WeatherToday() {
  return (
    <div className="card bg-white p-4 shadow">
      <h2 className="text-xl font-semibold">Today's Weather</h2>
      <p>🌤️ 28°C - Partly Cloudy</p>
      <p>📍 Nairobi, Kenya</p>
      <p>📅 April 30, 2025</p>
    </div>
  )
}
EOL

# WeatherForecast.tsx
cat > $COMPONENTS_DIR/WeatherForecast.tsx <<'EOL'
export default function WeatherForecast() {
  return (
    <div className="card bg-white p-4 shadow">
      <h2 className="text-lg font-semibold mb-2">Next 3 Days Forecast</h2>
      <ul className="space-y-1">
        <li>Wed - 🌧️ 24°C</li>
        <li>Thu - ☀️ 30°C</li>
        <li>Fri - ⛅ 26°C</li>
      </ul>
    </div>
  )
}
EOL

# WeatherStats.tsx
cat > $COMPONENTS_DIR/WeatherStats.tsx <<'EOL'
export default function WeatherStats() {
  return (
    <div className="card bg-white p-4 shadow">
      <h2 className="text-lg font-semibold mb-2">Wind & Humidity</h2>
      <p>💨 Wind: 12 km/h</p>
      <p>💧 Humidity: 75%</p>
    </div>
  )
}
EOL

echo "🔍 Checking file structure..."
REQUIRED_FILES=(
  "app/page.tsx"
  "app/layout.tsx"
  "$COMPONENTS_DIR/SearchBox.tsx"
  "$COMPONENTS_DIR/TemperatureToggle.tsx"
  "$COMPONENTS_DIR/WeatherToday.tsx"
  "$COMPONENTS_DIR/WeatherForecast.tsx"
  "$COMPONENTS_DIR/WeatherStats.tsx"
  "$STYLES_DIR/globals.css"
)

MISSING=false
for path in "${REQUIRED_FILES[@]}"; do
  if [ ! -e "$path" ]; then
    echo "❌ Missing: $path"
    MISSING=true
  else
    echo "✅ Found: $path"
  fi
done

if $MISSING; then
  echo "⚠️ Setup incomplete. Please fix the missing files."
  exit 1
else
  echo "✅ Frontend setup complete!"
  echo "💡 Run the app using: cd $PROJECT_NAME && npm run dev"
fi
