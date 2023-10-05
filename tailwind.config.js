/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#ff0000',
        description: '#2f3135',
      },
    },
  },
  plugins: [],
};
