import { mapIcon } from "../services/weatherApi";

export default function DailyForecast({ daily }) {
  return (
    <div className="w-full">
      <div className="font-semibold text-lg text-white mb-4">Daily forecast</div>
      
      <div className="flex gap-5 overflow-x-auto pb-4">
        {daily.slice(0, 7).map((d) => {
          const icon = mapIcon(d.weather[0].icon);
          return (
            <div
              key={d.dt}
              className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center min-w-[100px]"
            >
              <div className="text-sm text-gray-300 mb-3">
                {new Date(d.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short"
                })}
              </div>
              <img src={icon} className="w-12 h-12 mb-3" />
              <div className="text-base text-white font-medium">
                {Math.round(d.temp.max)}°
              </div>
              <div className="text-sm text-gray-400">
                {Math.round(d.temp.min)}°
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}