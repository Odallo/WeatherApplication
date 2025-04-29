<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; // Import the Http facade
use Illuminate\Support\Facades\Log; // Import Log facade for debugging

class WeatherController extends Controller
{
    /**
     * Fetch weather data for a specific city from OpenWeatherMap API.
     *
     * @param string $city The name of the city.
     * @return \Illuminate\Http\JsonResponse Returns weather data or an error message.
     */
    public function getWeatherByCity(string $city)
    {
        // Retrieve API key and URL from environment variables
        $apiKey = config('app.openweathermap_api_key'); // Better way to access env vars via config cache
        $apiUrl = config('app.openweathermap_api_url'); // Better way

        // Fallback if config caching isn't set up yet during early dev
        if (!$apiKey) $apiKey = env('OPENWEATHERMAP_API_KEY');
        if (!$apiUrl) $apiUrl = env('OPENWEATHERMAP_API_URL', 'https://api.openweathermap.org/data/2.5/weather'); // Default value


        if (!$apiKey) {
             Log::error('OpenWeatherMap API Key is not configured.');
             return response()->json(['error' => 'Server configuration error.'], 500);
        }

        try {
            // Make the GET request to OpenWeatherMap
            $response = Http::timeout(10)->get($apiUrl, [ // Added timeout
                'q' => $city,
                'appid' => $apiKey,
                'units' => 'metric' // Request temperature in Celsius
            ]);

            // Check for successful response from OpenWeatherMap
            if ($response->successful()) {
                // Return the JSON data directly from OpenWeatherMap
                return response()->json($response->json());
            }

            // Handle specific errors from OpenWeatherMap if needed
            if ($response->status() == 404) {
                 Log::warning("City not found in OpenWeatherMap: " . $city);
                 return response()->json(['error' => 'City not found'], 404);
            }

            if ($response->status() == 401) {
                Log::error('Invalid OpenWeatherMap API Key or key not activated yet.');
                return response()->json(['error' => 'Invalid API key'], 401);
            }

             // Handle other client/server errors from OpenWeatherMap
             Log::error('OpenWeatherMap API error', [
                 'status' => $response->status(),
                 'body' => $response->body()
             ]);
            return response()->json(['error' => 'Failed to retrieve weather data'], $response->status());

        } catch (\Illuminate\Http\Client\ConnectionException $e) {
             Log::error('Could not connect to OpenWeatherMap API: ' . $e->getMessage());
            return response()->json(['error' => 'Could not connect to weather service'], 504); // Gateway Timeout
        } catch (\Exception $e) {
             Log::error('An unexpected error occurred: ' . $e->getMessage());
            return response()->json(['error' => 'An unexpected error occurred'], 500);
        }
    }

    // --- Configuration Note ---
    // For config('app.openweathermap_api_key') to work reliably,
    // add these keys to your config/app.php file:
    /*
    'openweathermap_api_key' => env('OPENWEATHERMAP_API_KEY'),
    'openweathermap_api_url' => env('OPENWEATHERMAP_API_URL'),
    */
    // Then potentially run 'php artisan config:cache' in production.
    // For development, env() helper is often sufficient.

}