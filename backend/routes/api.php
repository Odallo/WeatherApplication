<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\WeatherController;

Route::middleware('api')->group(function () {
    Route::get('/weather', [WeatherController::class, 'getWeather']);
});
