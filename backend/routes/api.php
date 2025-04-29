<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WeatherController; // Import the controller

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route to get weather data by city name
// Example: GET /api/weather/london
Route::get('/weather/{city}', [WeatherController::class, 'getWeatherByCity']);

// Default user route (optional, often removed for pure APIs)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});