/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js", // Include the main app entry point
    "./src/**/*.{js,ts,jsx,tsx}", // Include all files in the `src` folder
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};


