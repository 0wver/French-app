/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ios-blue': {
          light: '#5AC8FA',
          DEFAULT: '#007AFF',
          dark: '#0071E3',
        },
        'ios-gray': {
          100: '#F2F2F7',
          200: '#E5E5EA',
          300: '#D1D1D6',
          400: '#C7C7CC',
          500: '#AEAEB2',
          600: '#8E8E93',
          700: '#636366',
          800: '#48484A',
          900: '#3A3A3C',
        },
        'ios-red': '#FF3B30',
        'ios-green': '#34C759',
        'ios-orange': '#FF9500',
        'ios-yellow': '#FFCC00',
        'ios-purple': '#AF52DE',
        'ios-pink': '#FF2D55',
        'dark': {
          100: '#1C1C1E',
          200: '#2C2C2E',
          300: '#3A3A3C',
          400: '#48484A',
          500: '#636366',
        },
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      backdropBlur: {
        'ios': '20px',
        'ios-strong': '30px',
      },
      boxShadow: {
        'ios': '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
        'ios-strong': '0 10px 25px 0 rgba(0, 0, 0, 0.1)',
        'ios-dark': '0 4px 14px 0 rgba(0, 0, 0, 0.3)',
        'ios-dark-strong': '0 10px 25px 0 rgba(0, 0, 0, 0.4)',
        'ios-inner': 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'ios-button': '0 2px 8px 0 rgba(0, 0, 0, 0.12)',
      },
      dropShadow: {
        'ios': '0 2px 4px rgba(0, 0, 0, 0.07)',
        'ios-strong': '0 4px 6px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
} 