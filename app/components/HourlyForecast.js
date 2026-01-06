import React from 'react';

export default function HourlyForecast({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  const getWeatherIcon = (description) => {
    const desc = description?.toLowerCase() || '';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
    if (desc.includes('wind')) return '💨';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder') || desc.includes('storm')) return '⛈️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    return '🌤️';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white drop-shadow">Next 24 Hours</h3>
      
      <div className="relative">
        {/* Gradient background for scroll container */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent rounded-l-xl z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/40 to-transparent rounded-r-xl z-10 pointer-events-none"></div>
        
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-4 px-2 min-w-min">
            {forecast.map((hour, index) => {
              const temp = Math.round(hour.main.temp);
              const time = new Date(hour.dt * 1000);
              const hours = time.getHours();
              const timeStr = `${hours % 12 || 12}${hours >= 12 ? 'PM' : 'AM'}`;
              
              return (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center min-w-[100px] group"
                >
                  {/* Time */}
                  <p className="text-sm font-medium text-gray-300 mb-2">{timeStr}</p>
                  
                  {/* Icon */}
                  <p className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {getWeatherIcon(hour.weather[0].description)}
                  </p>
                  
                  {/* Temperature */}
                  <p className="text-xl font-bold text-white mb-1">{temp}°</p>
                  
                  {/* Condition */}
                  <p className="text-xs text-gray-400 truncate">
                    {hour.weather[0].main}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Optional: Temperature curve visualization */}
      <div className="hidden lg:block h-24 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 relative overflow-hidden">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
          <defs>
            <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.5)" />
              <stop offset="100%" stopColor="rgba(96, 165, 250, 0.1)" />
            </linearGradient>
          </defs>
          
          {/* Temperature line */}
          <polyline
            points={forecast
              .map((hour, idx) => {
                const temp = hour.main.temp;
                const minTemp = Math.min(...forecast.map(h => h.main.temp));
                const maxTemp = Math.max(...forecast.map(h => h.main.temp));
                const range = maxTemp - minTemp || 1;
                const y = 90 - ((temp - minTemp) / range) * 80;
                return `${(idx / (forecast.length - 1)) * 400},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="rgba(96, 165, 250, 0.8)"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
