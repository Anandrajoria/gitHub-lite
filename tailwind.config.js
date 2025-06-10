/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "github-blue": "#0366d6",
        "github-gray": "#24292e",
        "github-light-gray": "#f6f8fa",
      },
      fontFamily: {
        "roboto-condensed": ['"Roboto Condensed"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
