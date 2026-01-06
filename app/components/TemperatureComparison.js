import React from 'react';
import { RiThermometerLine } from "@remixicon/react";

export default function TemperatureComparison({ actual, feelsLike }) {
  const difference = Math.abs(feelsLike - actual);
  const isColder = feelsLike < actual;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Actual Temperature */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-20 blur-xl"></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20">
            <p className="text-gray-300 text-sm font-medium mb-2">Actual Temp</p>
            <p className="text-4xl font-bold text-white">{Math.round(actual)}°</p>
            <p className="text-xs text-gray-400 mt-1">Thermometer</p>
          </div>
        </div>

        {/* Feels Like Temperature */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-red-600 opacity-20 blur-xl"></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center border border-white/20">
            <p className="text-gray-300 text-sm font-medium mb-2">Feels Like</p>
            <p className="text-4xl font-bold text-white">{Math.round(feelsLike)}°</p>
            <p className="text-xs text-gray-400 mt-1">Perception</p>
          </div>
        </div>
      </div>

      {/* Difference Indicator */}
      {difference > 0 && (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-2xl ${isColder ? '🥶' : '🔥'}`}></span>
              <p className="text-gray-300 text-sm">
                {isColder ? 'Feels Colder' : 'Feels Warmer'} by
              </p>
            </div>
            <p className="text-white font-bold text-lg">{Math.round(difference)}°</p>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            {isColder 
              ? 'Wind chill making it feel colder than actual temperature' 
              : 'Humidity and sun making it feel warmer'}
          </p>
        </div>
      )}
    </div>
  );
}
