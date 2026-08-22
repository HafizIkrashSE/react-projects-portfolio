import { useEffect, useState } from "react";
import Search from "../search/Search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(city) {
    if (!city.trim()) return;

    try {
      setLoading(true);

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch weather");
      }

      setWeatherData(data);
    } catch (error) {
      console.error("Weather error:", error);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    fetchWeatherData(search.trim());
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    const loadDefaultWeather = async () => {
      const city = "Lahore";

      try {
        setLoading(true);

        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch weather");
        }

        setWeatherData(data);
      } catch (error) {
        console.error("Weather error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDefaultWeather();
  }, []);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : weatherData ? (
        <div>
          <div className="city-name">
            <h2>
              {weatherData.name}, <span>{weatherData.sys.country}</span>
            </h2>
          </div>

          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>

          <div className="temp">
            {Math.round(weatherData.main.temp)}°C
          </div>

          <p className="description">
            {weatherData.weather[0].description}
          </p>

          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">
                  {weatherData.wind.speed} m/s
                </p>
                <p>Wind Speed</p>
              </div>
            </div>

            <div className="column">
              <div>
                <p className="humidity">
                  {weatherData.main.humidity}%
                </p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Search for a city to see the weather.</p>
      )}
    </div>
  );
}