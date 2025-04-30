<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city', 'Nairobi'); // default to Nairobi
        $apiKey = env('OPENWEATHER_API_KEY');

        // Geocode to get coordinates (lat/lon)
        $geoRes = Http::get("http://api.openweathermap.org/geo/1.0/direct", [
            'q' => $city,
            'limit' => 1,
            'appid' => $apiKey
        ]);

        if (!$geoRes->successful() || count($geoRes->json()) === 0) {
            return response()->json(['error' => 'City not found'], 404);
        }

        $geoData = $geoRes->json()[0];
        $lat = $geoData['lat'];
        $lon = $geoData['lon'];

        // Get current weather
        $weatherRes = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $apiKey,
            'units' => 'metric'
        ]);

        // Get 3-day forecast
        $forecastRes = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $apiKey,
            'units' => 'metric'
        ]);

        if ($weatherRes->successful() && $forecastRes->successful()) {
            $weather = $weatherRes->json();
            $forecastList = $forecastRes->json()['list'];

            $dailyForecasts = collect($forecastList)
                ->filter(function ($item, $index) {
                    return $index % 8 === 0;
                })
                ->take(3)
                ->map(function ($item) {
                    return [
                        'date' => date('D, M j', $item['dt']),
                        'icon' => $item['weather'][0]['icon'],
                        'min' => $item['main']['temp_min'],
                        'max' => $item['main']['temp_max'],
                    ];
                })->values();

            return response()->json([
                'status' => 'success',
                'data' => [
                    'weather' => [
                        'temperature' => $weather['main']['temp'],
                        'description' => $weather['weather'][0]['description'],
                        'icon' => $weather['weather'][0]['icon'],
                        'date' => now()->format('l, F j, Y'),
                        'location' => $weather['name'] . ', ' . $weather['sys']['country'],
                        'windSpeed' => $weather['wind']['speed'],
                        'windDirection' => $weather['wind']['deg'],
                        'humidity' => $weather['main']['humidity']
                    ],
                    'forecast' => $dailyForecasts
                ]
            ]);
        }

        return response()->json(['error' => 'Failed to fetch weather or forecast'], 500);
    }
}
