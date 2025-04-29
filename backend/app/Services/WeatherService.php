<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
    public function getWeatherByCity($city)
    {
        $apiKey = env('OPENWEATHER_API_KEY');

        $currentWeather = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric'
        ])->json();

        $forecast = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric'
        ])->json();

        return [
            'current' => $currentWeather,
            'forecast' => $this->processForecast($forecast)
        ];
    }

    private function processForecast($data)
    {
        $daily = [];
        $seen = [];

        foreach ($data['list'] as $item) {
            $date = date('Y-m-d', strtotime($item['dt_txt']));
            $hour = date('H', strtotime($item['dt_txt']));
            if (in_array($date, $seen) && $hour != '12') continue;

            if (!in_array($date, $seen) || $hour == '12') {
                $daily[] = [
                    'date' => $item['dt_txt'],
                    'temp' => $item['main']['temp'],
                    'description' => $item['weather'][0]['description'],
                    'icon' => $item['weather'][0]['icon']
                ];
                $seen[] = $date;
            }

            if (count($daily) === 3) break;
        }

        return $daily;
    }
}
