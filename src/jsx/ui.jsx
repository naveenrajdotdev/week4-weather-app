import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchWeather, fetchForecast } from "./weatherService";
import { storage } from "./storage";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(storage.getCity());
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
if (!weather) return <h2 style={{color:"white"}}>Loading...</h2>;
  const loadData = async (cityName) => {
    try {
      const w = await fetchWeather(cityName);
      const f = await fetchForecast(cityName);

      setWeather(w.data);
      setForecast(f.data.list);
      setCity(cityName);
      storage.setCity(cityName);
    } catch {
      alert("City not found");
    }
  };

  useEffect(() => {
    loadData(city);
  }, []);

  return (
    <WeatherContext.Provider value={{ city, weather, forecast, loadData }}>
      {children}
    </WeatherContext.Provider>
  );
};

// UI COMPONENTS

export const Dashboard = () => {
  const { city, weather, forecast, loadData } = useWeather();
  const [input, setInput] = useState("");

  if (!weather) return <p>Loading...</p>;

  const days = forecast.filter((_, i) => i % 8 === 0);

  return (
    <div className="container">
      <h1>🌤️ WEATHER DASHBOARD</h1>

      <p>📍 {city}</p>

      <div className="weather-box">
        <p>🌡️ {weather.main.temp}°C</p>
        <p>☁️ {weather.weather[0].description}</p>
        <p>💧 {weather.main.humidity}%</p>
        <p>💨 {weather.wind.speed} km/h</p>
        <p>📊 {weather.main.pressure} hPa</p>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        loadData(input);
        setInput("");
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search city..."
        />
        <button>🔍</button>
      </form>

      <div className="forecast">
        <h3>5-Day Forecast</h3>
        {days.map((day, i) => (
          <div key={i} className="forecast-item">
            <p>{new Date(day.dt_txt).toDateString()}</p>
            <p>{day.main.temp}°C</p>
            <p>{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};