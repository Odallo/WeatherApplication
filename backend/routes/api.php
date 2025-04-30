<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\WeatherController;

Route::get('/weather', function (Request $request) {
    $city = $request->query('city', 'Nairobi'); // Default to Nairobi
    $unit = $request->query('unit', 'metric'); // Default to metric
    $apiKey = env('OPENWEATHER_API_KEY');

    // 1. Fetch geolocation
    $geoResponse = Http::get("http://api.openweathermap.org/geo/1.0/direct?q={$city}&limit=1&appid={$apiKey}");
    $geoData = $geoResponse->json();

    if (empty($geoData)) {
        return response()->json([
            'status' => 'error',
            'message' => 'City not found',
        ], 404);
    }

    $lat = $geoData[0]['lat'];
    $lon = $geoData[0]['lon'];

    // 2. Fetch current weather
    $weatherResponse = Http::get("https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&appid={$apiKey}&units={$unit}");
    if ($weatherResponse->failed()) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to fetch current weather data',
        ], 500);
    }
    $weatherData = $weatherResponse->json();

    // 3. Fetch forecast
    $forecastResponse = Http::get("https://api.openweathermap.org/data/2.5/forecast?lat={$lat}&lon={$lon}&appid={$apiKey}&units={$unit}");
    if ($forecastResponse->failed()) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to fetch forecast data',
        ], 500);
    }
    $forecastData = $forecastResponse->json();

    return response()->json([
        'status' => 'success',
        'current' => $weatherData,
        'forecast' => $forecastData,
    ]);
});

