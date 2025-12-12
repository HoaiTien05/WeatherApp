import { mapIcon } from "../services/weatherApi";

export default function CurrentCard({ city, current, units }) {
  const icon = mapIcon(current.weather[0].icon);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main weather card */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 rounded-3xl p-20 w-full overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-1/3 w-2.5 h-2.5 bg-orange-400 rounded-full"></div>
        <div className="absolute top-8 left-12 w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-16 left-1/3 w-2 h-2 bg-orange-300 rounded-full"></div>
        <div className="absolute bottom-12 right-20 w-2 h-2 bg-purple-300 rounded-full opacity-50"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-white mb-2">{city}</div>
            <div className="text-base text-blue-100">
              {new Date(current.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img src={icon} className="w-24 h-24" />
            <div className="text-8xl font-bold text-white leading-none">
              {Math.round(current.temp)}°
            </div>
          </div>
        </div>
      </div>

      {/* Weather details grid */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-gray-800/80 rounded-2xl p-4 flex flex-col">
          <div className="text-gray-400 text-xs mb-1">Feels Like</div>
          <div className="text-white text-2xl font-semibold">
            {Math.round(current.feels_like)}°
          </div>
        </div>
        <div className="bg-gray-800/80 rounded-2xl p-4 flex flex-col">
          <div className="text-gray-400 text-xs mb-1">Humidity</div>
          <div className="text-white text-2xl font-semibold">
            {current.humidity}%
          </div>
        </div>
        <div className="bg-gray-800/80 rounded-2xl p-4 flex flex-col">
          <div className="text-gray-400 text-xs mb-1">Wind</div>
          <div className="text-white text-2xl font-semibold">
            {current.wind_speed} {units.wind}
          </div>
        </div>
        <div className="bg-gray-800/80 rounded-2xl p-4 flex flex-col">
          <div className="text-gray-400 text-xs mb-1">Precipitation</div>
          <div className="text-white text-2xl font-semibold">
            {current.rain ?? 0} {units.rain}
          </div>
        </div>
      </div>
    </div>
  );
}