import { useState } from "react";
import { Settings, ChevronDown, Check } from "lucide-react";

export default function UnitToggle({ units, setUnits }) {
  const [open, setOpen] = useState(false);

  const changeUnit = (field, value) => {
    setUnits((u) => ({ ...u, [field]: value }));
  };

  return (
    <div className="relative">
      <button
        aria-label="Toggle units"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-[#252839] px-4 py-2 rounded-lg hover:bg-[#2F3349] transition text-white"
      >
        <Settings className="w-4 h-4" />
        <span className="text-sm">Units</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <>
          {/* Overlay to close dropdown */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 bg-[#252839] rounded-xl shadow-2xl w-64 z-20 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="text-sm font-semibold text-white">Switch to Imperial</div>
            </div>

            {/* Temperature Section */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="text-xs text-gray-400 mb-2">Temperature</div>
              <button
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#2F3349] transition text-left"
                onClick={() => changeUnit("temp", "C")}
              >
                <span className="text-sm text-white">Celsius (°C)</span>
                {units.temp === "C" && <Check className="w-4 h-4 text-white" />}
              </button>
              <button
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#2F3349] transition text-left"
                onClick={() => changeUnit("temp", "F")}
              >
                <span className="text-sm text-white">Fahrenheit (°F)</span>
                {units.temp === "F" && <Check className="w-4 h-4 text-white" />}
              </button>
            </div>

            {/* Wind Speed Section */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="text-xs text-gray-400 mb-2">Wind Speed</div>
              <button
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#2F3349] transition text-left"
                onClick={() => changeUnit("wind", "kmh")}
              >
                <span className="text-sm text-white">km/h</span>
                {units.wind === "kmh" && <Check className="w-4 h-4 text-white" />}
              </button>
              <button
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#2F3349] transition text-left"
                onClick={() => changeUnit("wind", "mph")}
              >
                <span className="text-sm text-white">mph</span>
                {units.wind === "mph" && <Check className="w-4 h-4 text-white" />}
              </button>
            </div>

            {/* Precipitation Section */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="text-xs text-gray-400 mb-2">Precipitation</div>
              <button
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#2F3349] transition text-left"
                onClick={() => changeUnit("rain", "mm")}
              >
                <span className="text-sm text-white">Millimeters (mm)</span>
                {units.rain === "mm" && <Check className="w-4 h-4 text-white" />}
              </button>
              <button
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#2F3349] transition text-left"
                onClick={() => changeUnit("rain", "in")}
              >
                <span className="text-sm text-white">Inches (in)</span>
                {units.rain === "in" && <Check className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}