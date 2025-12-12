import sample from "../data/sampleResponse.json";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const USE_FAKE = import.meta.env.VITE_USE_FAKE_DATA === "true";

/** WeatherAPI has its own icon URL */
export function mapIcon(code) {
  return `https:${code}`;
}

/** Search city → WeatherAPI already provides lat/lon */
export async function geocodeCity(city) {
  if (USE_FAKE) return { lat: 52.52, lon: 13.405, name: "Berlin" };

  const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding error");

  const data = await res.json();
  if (!data.length) throw new Error("City not found");

  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].name,
  };
}

/** WeatherAPI fetch data */
export async function fetchWeather(lat, lon) {
  if (USE_FAKE) return sample;

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");

  const data = await res.json();

  
  const normalized = {
    city: data.location.name,
    current: {
      dt: new Date(data.location.localtime).getTime() / 1000,
      temp: data.current.temp_c,
      feels_like: data.current.feelslike_c,
      humidity: data.current.humidity,
      wind_speed: data.current.wind_kph,
      rain: data.current.precip_mm,
      weather: [{ icon: data.current.condition.icon }],
    },
    hourly: data.forecast.forecastday.flatMap((day) =>
      day.hour.map((h) => ({
        dt: new Date(h.time).getTime() / 1000,
        temp: h.temp_c,
        weather: [{ icon: h.condition.icon }],
        dayName: new Date(h.time).toLocaleDateString("en-US", {
          weekday: "long",
        }),
      }))
    ),
    daily: data.forecast.forecastday.map((d) => ({
      dt: new Date(d.date).getTime() / 1000,
      temp: { min: d.day.mintemp_c, max: d.day.maxtemp_c },
      weather: [{ icon: d.day.condition.icon }],
    })),
  };

  return normalized;
}
