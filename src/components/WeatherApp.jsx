import { useState, useEffect } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import CurrentCard from "./CurrentCard";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import { geocodeCity, fetchWeather } from "../services/weatherApi";

export default function WeatherApp() {
  const [units, setUnits] = useState({
    temp: "C",
    wind: "kmh",
    rain: "mm"
  });

  const [city, setCity] = useState("Berlin");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load(cityName) {
    if (!cityName || !cityName.trim()) return;
    try {
      setLoading(true);
      setError(null);

      const { lat, lon, name } = await geocodeCity(cityName);
      const data = await fetchWeather(lat, lon);

      setCity(name ?? cityName);
      setWeather(data);
    } catch (e) {
      setError(e?.message ?? "Unable to fetch weather");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white">
      <div className="max-w-[1400px] mx-auto px-20">
        <Header units={units} setUnits={setUnits} />

        <h1 className="text-center text-5xl font-bold mt-8 mb-10">
          How's the sky looking today?
        </h1>

        {/* SearchBar: keep onSearch/onSelect = load to refresh results */}
        <SearchBar onSearch={load} onSelect={load} />

        {loading && <div className="mt-10 text-center text-gray-400">Loading...</div>}

        {error && (
          <div className="text-center mt-10">
            <div className="text-xl font-semibold mb-2">Something went wrong</div>
            <div className="text-gray-400">{error}</div>
            <button
              className="mt-4 bg-[#5B6FFF] px-6 py-2 rounded-lg hover:bg-[#6B7FFF] transition"
              onClick={() => load(city)}
            >
              Retry
            </button>
          </div>
        )}

        {/* Because load() is called on mount, weather will have data and the sections below will be displayed */}
        {weather && !loading && !error && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-6">
              <CurrentCard
                city={city}
                current={weather.current}
                units={units}
              />
              <DailyForecast daily={weather.daily} />
            </div>
            <HourlyForecast hourly={weather.hourly} />
          </div>
        )}
      </div>
    </div>
  );
}
