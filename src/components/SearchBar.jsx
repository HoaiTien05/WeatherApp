import { useState, useRef, useEffect } from "react";
import debounce from "../utils/debounce";

export default function SearchBar({ onSearch, suggestions = [], onSelect }) {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null);

  const debouncedSearch = debounce((v) => {
    if (v.trim()) onSearch(v);
  }, 500);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    debouncedSearch(v);
    setShowDropdown(true);
  };

  const handleSelect = (city) => {
    setValue(city);
    setShowDropdown(false);
    if (onSelect) onSelect(city);
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl mx-auto mt-6 relative">
      <div className="flex gap-3 items-center">
        <div className="flex-1 bg-gray-800 rounded-xl px-4 py-3 flex items-center gap-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            aria-label="Search city"
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
            placeholder="Search for a place..."
            value={value}
            onChange={handleChange}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-colors">
          Search
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-gray-800 rounded-2xl shadow-lg py-2 z-20 overflow-hidden">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              className="px-4 py-3 text-white hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
