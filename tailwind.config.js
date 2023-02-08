/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "dark-bg": "#3e2630",
        "dark-gray": "#2C2C37",
        "main-bg": "#EF5138",
      },
      colors: {
        "main-color": "#EF5138",
        "dark-color": "#3e2630",
      },
    },
  },
  plugins: [],
};
