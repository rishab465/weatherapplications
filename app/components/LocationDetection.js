"use client"
import React, { useState, useEffect } from 'react';
import { RiMapPinLine, RiRefreshLine } from "@remixicon/react";

export default function LocationDetection({ onLocationFound, onSearch, loading }) {
  const [usingGeolocation, setUsingGeolocation] = useState(false);

  const detectLocation = async () => {
    setUsingGeolocation(true);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocoding using OpenWeatherMap API
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=1fe03e4d75b25077e07b4025ce422fbe`
            );
            const data = await response.json();
            
            if (data[0]) {
              onLocationFound(`${data[0].name}, ${data[0].country}`);
            }
          } catch (error) {
            console.error('Location error:', error);
            onLocationFound('Nagpur');
          } finally {
            setUsingGeolocation(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUsingGeolocation(false);
        }
      );
    }
  };

  return (
    <button
      onClick={detectLocation}
      disabled={loading || usingGeolocation}
      className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all disabled:opacity-50 group"
      title="Detect your location"
    >
      {usingGeolocation ? (
        <RiRefreshLine size={18} className="animate-spin" />
      ) : (
        <RiMapPinLine size={18} className="group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
}
