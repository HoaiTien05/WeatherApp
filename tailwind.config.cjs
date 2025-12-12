/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "sans-serif"] },
      colors: {
        darkBg: "#0B0E1A",
        cardBg: "#121526",
        accent: "#4C6FFF",
      },
      boxShadow: { card: "0 4px 20px rgba(0,0,0,0.35)" },
    },
  },
  darkMode: "class",
  plugins: [],
};
