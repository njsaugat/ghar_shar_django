/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        'blue-green': '#89D4CF',
        'majorelle-blue': '#734AE8',
      },
      fontFamily: {
        poppins: ['"Poppins"'],
        inter: ['"Inter"'],
      },
    },
  },
  plugins: [],
};
