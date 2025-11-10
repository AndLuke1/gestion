const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['\"Inter\"', ...fontFamily.sans],
      },
      colors: {
        brand: {
          50: '#edf5ff',
          100: '#dbe9ff',
          200: '#b8d4ff',
          300: '#8fb8ff',
          400: '#5e90ff',
          500: '#3368f0',
          600: '#244fd1',
          700: '#1d3ea6',
          800: '#1d367f',
          900: '#1d315f'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
