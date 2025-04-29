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

        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric'
        ]);

        if ($response->successful()) {
            $data = $response->json();
            return response()->json([
                'status' => 'success',
                'data' => [
                    'city' => $data['name'],
                    'temperature' => $data['main']['temp'] . "°C",
                    'condition' => $data['weather'][0]['description']
                ]
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch weather data'
            ], $response->status());
        }
    }
}
