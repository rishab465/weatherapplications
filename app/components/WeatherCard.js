import React from 'react';
import { RiWindyLine, RiEye2Line, RiCompassDiscoverLine } from "@remixicon/react";

export default function WeatherCard({ city, weather, loading, error }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white text-lg">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-300 text-lg font-semibold">{error}</p>
          <p className="text-white text-sm mt-2">Please try a different city</p>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white text-lg">Enter a city name to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* City and Temperature */}
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg">{city}</h1>
        <p className="text-xl text-gray-100 mt-2">{weather.main?.description || 'Weather'}</p>
      </div>

      {/* Main Temperature */}
      <div className="text-center">
        <div className="inline-block">
          <p className="text-8xl md:text-9xl font-bold text-white drop-shadow-lg">{Math.round(weather.temp)}°</p>
          <p className="text-xl text-gray-200 mt-2">C</p>
        </div>
      </div>

      {/* Temperature Range */}
      <div className="grid grid-cols-2 gap-4 text-center max-w-sm mx-auto">
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
          <p className="text-gray-200 text-sm font-medium">Max Temperature</p>
          <p className="text-3xl font-bold text-white">{Math.round(weather.temp_max)}°</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
          <p className="text-gray-200 text-sm font-medium">Min Temperature</p>
          <p className="text-3xl font-bold text-white">{Math.round(weather.temp_min)}°</p>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <RiWindyLine size={24} className="text-white" />
          </div>
          <p className="text-gray-200 text-sm font-medium">Humidity</p>
          <p className="text-2xl font-bold text-white">{weather.humidity}%</p>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <RiEye2Line size={24} className="text-white" />
          </div>
          <p className="text-gray-200 text-sm font-medium">Visibility</p>
          <p className="text-2xl font-bold text-white">{(weather.visibility / 1000).toFixed(1)}km</p>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">
            <RiCompassDiscoverLine size={24} className="text-white" />
          </div>
          <p className="text-gray-200 text-sm font-medium">Wind Speed</p>
          <p className="text-2xl font-bold text-white">{weather.speed?.toFixed(1) || 'N/A'} m/s</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-center">
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-3">
          <p className="text-gray-200 text-xs font-medium">Pressure</p>
          <p className="text-xl font-bold text-white">{weather.pressure} mb</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-3">
          <p className="text-gray-200 text-xs font-medium">Feels Like</p>
          <p className="text-xl font-bold text-white">{Math.round(weather.feels_like)}°C</p>
        </div>
      </div>
    </div>
  );
}
