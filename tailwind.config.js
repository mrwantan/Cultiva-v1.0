/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cultiva: {
          green: '#4ade80', // Healthy
          darkGreen: '#14532d',
          earth: '#78350f',
          orange: '#ffedd5', // Withered background
          alert: '#c2410c', // Withered icon
        }
      }
    },
  },
  plugins: [],
}