/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fantasy: ['"Cinzel Decorative"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'mystic-gold': {
          DEFAULT: '#f5d76e',
          'light': '#f7e291',
          'dark': '#c4ab58',
        },
        'royal-purple': {
          DEFAULT: '#6b21a8',
          'light': '#9333ea',
          'dark': '#4c1d95',
        },
        'base-bg': '#0d0a1a',
      },
    },
  },
  plugins: [],
}
