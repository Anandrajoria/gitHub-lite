/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "github-gray": "#24292e",
        "github-blue": "#0366d6",
        "dark-bg": "#1a1a1a",
        "dark-card": "#2d2d2d",
        "dark-text": "#e5e5e5",
        "dark-border": "#404040",
      },
      fontFamily: {
        "roboto-condensed": ['"Roboto Condensed"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
