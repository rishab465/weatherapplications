// Utility functions for weather analysis and suggestions

export const WEATHER_MOODS = {
  rainy: {
    gradient: 'from-slate-600 via-slate-700 to-slate-800',
    overlay: 'rgba(15, 23, 42, 0.6)',
    accent: '#64748b',
    description: 'Rainy & Calm'
  },
  sunny: {
    gradient: 'from-amber-400 via-orange-400 to-rose-400',
    overlay: 'rgba(251, 191, 36, 0.15)',
    accent: '#f59e0b',
    description: 'Sunny & Warm'
  },
  cloudy: {
    gradient: 'from-gray-400 via-gray-500 to-gray-600',
    overlay: 'rgba(107, 114, 128, 0.5)',
    accent: '#9ca3af',
    description: 'Cloudy & Cool'
  },
  snowy: {
    gradient: 'from-blue-100 via-blue-200 to-blue-300',
    overlay: 'rgba(191, 219, 254, 0.4)',
    accent: '#60a5fa',
    description: 'Snowy & Cold'
  },
  stormy: {
    gradient: 'from-purple-900 via-indigo-900 to-gray-900',
    overlay: 'rgba(55, 48, 163, 0.7)',
    accent: '#818cf8',
    description: 'Stormy & Intense'
  }
}

export const getWeatherMood = (condition, temp) => {
  const lowerCondition = condition?.toLowerCase() || ''
  
  if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return WEATHER_MOODS.stormy
  } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return WEATHER_MOODS.rainy
  } else if (lowerCondition.includes('snow') || lowerCondition.includes('sleet')) {
    return WEATHER_MOODS.snowy
  } else if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    return WEATHER_MOODS.sunny
  } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
    return WEATHER_MOODS.cloudy
  }
  
  return temp > 25 ? WEATHER_MOODS.sunny : WEATHER_MOODS.cloudy
}

export const calculateGoOutScore = (temp, humidity, windSpeed, feelsLike) => {
  let score = 100
  
  // Temperature scoring (optimal 18-25°C)
  if (temp < 0) score -= 30
  else if (temp < 5) score -= 20
  else if (temp < 10) score -= 10
  else if (temp > 35) score -= 25
  else if (temp > 30) score -= 10
  
  // Humidity scoring (optimal 40-60%)
  if (humidity > 80) score -= 20
  else if (humidity > 70) score -= 10
  
  // Wind scoring (lower is better)
  if (windSpeed > 25) score -= 30
  else if (windSpeed > 15) score -= 15
  else if (windSpeed > 10) score -= 5
  
  // Real-feel vs actual
  const difference = Math.abs(feelsLike - temp)
  if (difference > 10) score -= 15
  else if (difference > 5) score -= 8
  
  return Math.max(0, Math.min(100, Math.round(score)))
}

export const getGoOutScoreEmoji = (score) => {
  if (score >= 80) return '🌟'
  if (score >= 60) return '✅'
  if (score >= 40) return '⚠️'
  return '❌'
}

export const getGoOutScoreText = (score) => {
  if (score >= 80) return 'Perfect for outdoor activities!'
  if (score >= 60) return 'Good day to go out!'
  if (score >= 40) return 'Possible with preparation'
  return 'Better to stay indoors'
}

export const getOutfitSuggestion = (temp, condition) => {
  const lowerCondition = condition?.toLowerCase() || ''
  
  if (temp < 0) {
    return {
      emoji: '🧥',
      items: ['Heavy Winter Coat', 'Thermal Layers', 'Winter Boots', 'Warm Hat & Gloves'],
      advice: 'Bundle up! Extremely cold'
    }
  } else if (temp < 10) {
    return {
      emoji: '🧥',
      items: ['Winter Coat', 'Long Sleeves', 'Jeans', 'Scarf'],
      advice: 'Wear warm layers'
    }
  } else if (temp < 15) {
    return {
      emoji: '🧢',
      items: ['Sweater/Hoodie', 'Jeans', 'Sneakers', 'Light Jacket'],
      advice: 'Cool day wear'
    }
  } else if (temp < 20) {
    return {
      emoji: '👕',
      items: ['Long Sleeve Shirt', 'Light Jacket', 'Jeans'],
      advice: 'Comfortable casual wear'
    }
  } else if (temp < 25) {
    return {
      emoji: '👕',
      items: ['T-shirt', 'Shorts/Jeans', 'Sneakers'],
      advice: 'Pleasant spring weather'
    }
  } else if (temp < 30) {
    return {
      emoji: '👕',
      items: ['T-shirt', 'Shorts', 'Sunglasses', 'Sunscreen'],
      advice: 'Summer vibes! Stay cool'
    }
  } else {
    return {
      emoji: '🩱',
      items: ['Lightweight Clothes', 'Shorts', 'Hat', 'Sunscreen'],
      advice: 'Very hot! Light clothing only'
    }
  }
}

export const formatTimeAgo = (timestamp) => {
  const now = new Date()
  const then = new Date(timestamp)
  const seconds = Math.round((now - then) / 1000)
  
  if (seconds < 60) return 'just now'
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  return `${hours}h ago`
}
