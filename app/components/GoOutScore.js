import React from 'react';

export default function GoOutScore({ score }) {
  const getColor = () => {
    if (score >= 80) return 'from-green-400 to-emerald-600'
    if (score >= 60) return 'from-blue-400 to-cyan-600'
    if (score >= 40) return 'from-yellow-400 to-orange-600'
    return 'from-red-400 to-pink-600'
  }

  const getEmoji = () => {
    if (score >= 80) return '🌟'
    if (score >= 60) return '✅'
    if (score >= 40) return '⚠️'
    return '❌'
  }

  const getText = () => {
    if (score >= 80) return 'Perfect to Go Out!'
    if (score >= 60) return 'Good to Go Out'
    if (score >= 40) return 'Possible with Care'
    return 'Stay Indoors'
  }

  return (
    <div className="space-y-4">
      {/* Score Circle */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * (2 * Math.PI * 90)} ${2 * Math.PI * 90}`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={score >= 80 ? '#4ade80' : score >= 60 ? '#22d3ee' : score >= 40 ? '#facc15' : '#f87171'} />
                <stop offset="100%" stopColor={score >= 80 ? '#059669' : score >= 60 ? '#0891b2' : score >= 40 ? '#f97316' : '#dc2626'} />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl mb-2">{getEmoji()}</span>
            <p className="text-5xl font-bold text-white">{score}</p>
            <p className="text-gray-300 text-sm font-medium mt-1">Out Score</p>
          </div>
        </div>
      </div>

      {/* Text Description */}
      <div className="text-center space-y-2">
        <p className={`text-2xl font-bold bg-gradient-to-r ${getColor()} bg-clip-text text-transparent`}>
          {getText()}
        </p>
        <p className="text-gray-400 text-sm">
          Based on temperature, humidity, wind, and conditions
        </p>
      </div>
    </div>
  );
}
