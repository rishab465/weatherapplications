"use client"
import { useState, useEffect } from "react"

export default function Styling() {
  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const API_KEY = '1fe03e4d75b25077e07b4025ce422fbe'

  useEffect(() => {
    loadUserLocation()
  }, [])

  const loadUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetchWeatherByCoords(latitude, longitude)
        },
        () => {
          setLoading(false)
        }
      )
    }
  }

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setWeather(data)
        setLastUpdated(new Date())
        setSearch(data.name)

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        const forecastRes = await fetch(forecastUrl)
        if (forecastRes.ok) {
          const forecastData = await forecastRes.json()
          setForecast(forecastData.list.slice(0, 8))
        }
      }
    } catch (err) {
      console.error("Geolocation weather fetch failed")
    } finally {
      setLoading(false)
    }
  }

  const getEmoji = (desc) => {
    if (!desc) return "🌤️"
    const d = desc.toLowerCase()
    if (d.includes("rain")) return "🌧️"
    if (d.includes("cloud")) return "☁️"
    if (d.includes("clear") || d.includes("sunny")) return "☀️"
    if (d.includes("snow")) return "❄️"
    if (d.includes("thunder")) return "⛈️"
    return "🌤️"
  }

  const getBackgroundTheme = (condition = "", temp = null) => {
    const text = condition.toLowerCase()

    // Image URLs kept light (Unsplash) to visually match conditions
    if (text.includes("rain") || text.includes("drizzle")) {
      return {
        image: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80')",
        overlay: "linear-gradient(135deg, rgba(37, 47, 63, 0.75), rgba(15, 23, 42, 0.75))"
      }
    }

    if (text.includes("snow")) {
      return {
        image: "url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80')",
        overlay: "linear-gradient(135deg, rgba(99, 132, 169, 0.65), rgba(255, 255, 255, 0.6))"
      }
    }

    if (text.includes("thunder") || text.includes("storm")) {
      return {
        image: "url('https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?auto=format&fit=crop&w=1600&q=80')",
        overlay: "linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(59, 7, 100, 0.7))"
      }
    }

    if (text.includes("cloud")) {
      return {
        image: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')",
        overlay: "linear-gradient(135deg, rgba(75, 85, 99, 0.7), rgba(31, 41, 55, 0.65))"
      }
    }

    // Sunny/clear fallback uses temperature to adjust warmth
    if (temp !== null && temp > 30) {
      return {
        image: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80')",
        overlay: "linear-gradient(135deg, rgba(255, 146, 43, 0.65), rgba(244, 114, 182, 0.55))"
      }
    }

    return {
      image: "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1600&q=80')",
      overlay: "linear-gradient(135deg, rgba(56, 189, 248, 0.6), rgba(59, 130, 246, 0.6))"
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search.trim()) return

    setLoading(true)
    setError(null)
    setWeather(null)
    setForecast([])

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(search)}&units=metric&appid=${API_KEY}`
      const res = await fetch(url)
      
      if (!res.ok) {
        throw new Error("City not found")
      }

      const data = await res.json()
      setWeather(data)
      setLastUpdated(new Date())

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(search)}&units=metric&appid=${API_KEY}`
      const forecastRes = await fetch(forecastUrl)
      if (forecastRes.ok) {
        const forecastData = await forecastRes.json()
        setForecast(forecastData.list.slice(0, 8))
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const quickCities = ["London", "Tokyo", "Dubai", "Paris", "Sydney"]

  const backgroundTheme = weather
    ? getBackgroundTheme(weather.weather?.[0]?.description, weather.main?.temp)
    : null

  return (
    <div
      style={{
        backgroundImage: weather
          ? `${backgroundTheme.overlay}, ${backgroundTheme.image}`
          : "linear-gradient(135deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.85)), url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        transition: "background-image 0.8s ease, background 0.8s ease"
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ color: "white", fontSize: "48px", margin: "0 0 10px 0" }}>
            ☁️ Weather App
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>
            Search for any city to see the weather
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a city..."
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "12px 16px",
              borderRadius: "25px",
              border: "none",
              fontSize: "16px",
              outline: "none",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 28px",
              background: "white",
              color: "#667eea",
              border: "none",
              borderRadius: "25px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "all 0.3s"
            }}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        {/* Quick Cities */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          {quickCities.map((city) => (
            <button
              key={city}
              onClick={() => {
                setSearch(city)
                setTimeout(() => handleSearch({ preventDefault: () => {} }), 50)
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.35)"
                e.target.style.transform = "translateY(-3px)"
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)"
                e.target.style.transform = "translateY(0)"
              }}
              style={{
                padding: "8px 16px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.3s",
                backdropFilter: "blur(10px)"
              }}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "rgba(255,70,70,0.2)",
              border: "2px solid rgba(255,70,70,0.5)",
              color: "white",
              padding: "15px 20px",
              borderRadius: "15px",
              marginBottom: "20px",
              textAlign: "center"
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* Weather Display */}
        {weather && (
          <div>
            {/* Main Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "30px",
                padding: "40px",
                color: "white",
                marginBottom: "20px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                animation: "slideUp 0.5s ease-out"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div>
                  <p style={{ fontSize: "20px", margin: "0 0 10px 0" }}>
                    📍 {weather.name}, {weather.sys.country}
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      margin: "0 0 20px 0",
                      opacity: 0.8,
                      textTransform: "capitalize"
                    }}
                  >
                    {weather.weather[0].description}
                  </p>
                  <p style={{ fontSize: "64px", margin: "0", fontWeight: "bold" }}>
                    {Math.round(weather.main.temp)}°C {getEmoji(weather.weather[0].description)}
                  </p>
                </div>
                {lastUpdated && (
                  <p style={{ fontSize: "12px", opacity: 0.7, textAlign: "right" }}>
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>

              {/* Details Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "15px",
                  marginTop: "30px",
                  paddingTop: "30px",
                  borderTop: "1px solid rgba(255,255,255,0.2)"
                }}
              >
                {[
                  { label: "Feels Like", value: `${Math.round(weather.main.feels_like)}°C`, icon: "🌡️" },
                  { label: "Humidity", value: `${weather.main.humidity}%`, icon: "💧" },
                  { label: "Pressure", value: `${weather.main.pressure} mb`, icon: "🎯" },
                  { label: "Wind", value: `${Math.round(weather.wind.speed * 3.6)} km/h`, icon: "💨" },
                  { label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km`, icon: "👁️" },
                  { label: "Clouds", value: `${weather.clouds.all}%`, icon: "☁️" }
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "15px",
                      borderRadius: "15px",
                      textAlign: "center"
                    }}
                  >
                    <p style={{ fontSize: "20px", margin: "0 0 5px 0" }}>
                      {item.icon}
                    </p>
                    <p style={{ fontSize: "12px", margin: "0 0 8px 0", opacity: 0.8 }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Forecast */}
            {forecast.length > 0 && (
              <div
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "30px",
                  padding: "30px",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  animation: "slideUp 0.5s ease-out 0.1s both"
                }}
              >
                <h3 style={{ margin: "0 0 20px 0" }}>📅 Next Hours</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                    gap: "15px"
                  }}
                >
                  {forecast.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        padding: "15px",
                        borderRadius: "15px",
                        textAlign: "center"
                      }}
                    >
                      <p style={{ fontSize: "12px", margin: "0 0 8px 0", opacity: 0.8 }}>
                        {new Date(item.dt * 1000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                      <p style={{ fontSize: "24px", margin: "0 0 8px 0" }}>
                        {getEmoji(item.weather[0].description)}
                      </p>
                      <p style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
                        {Math.round(item.main.temp)}°C
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!weather && !loading && !error && (
          <div style={{ textAlign: "center", color: "white", marginTop: "60px" }}>
            <p style={{ fontSize: "20px", opacity: 0.8 }}>
              📍 Getting your location weather...
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

