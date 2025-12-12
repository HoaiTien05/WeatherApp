import { useState } from "react";
import { mapIcon } from "../services/weatherApi";

const DAYS = [
  "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday", "Sunday",
];

export default function HourlyForecast({ hourly }) {
  const [selectedDay, setSelectedDay] = useState("Tuesday");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = hourly.filter((h) => h.dayName === selectedDay);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 w-full md:w-85">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold text-lg text-white">Hourly Forecast</div>

        {/* DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-sm text-gray-300 bg-gray-700 px-3 py-1.5 rounded-lg"
          >
            {selectedDay}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 bg-gray-700 rounded-lg shadow-lg z-20">
              {DAYS.map((day) => (
                <div
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setIsOpen(false);
                  }}
                  className="px-8 py-2 text-gray-200 hover:bg-gray-600 cursor-pointer text-sm"
                >
                  {day}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* HOURLY LIST */}
      <div className="flex flex-col gap-2">
        {filtered.map((h) => {
          const icon = mapIcon(h.weather[0].icon);
          return (
            <div
              key={h.dt}
              className="flex justify-between items-center bg-gray-700/50 p-3 rounded-xl text-white"
            >
              <div className="flex items-center gap-3 flex-1">
                <img src={icon} className="w-8 h-8" />
                <span className="text-base">
                  {new Date(h.dt * 1000).toLocaleTimeString("en-US", {
                    hour: "numeric",
                  })}
                </span>
              </div>
              <span className="text-base font-medium">
                {Math.round(h.temp)}°
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
