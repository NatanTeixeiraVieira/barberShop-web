/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#38BDF8',
        secondary: '#46A5C1',
        paper: '#fefefe',
        star: '#FC980D',
        alert: '#FFC107',
        success: '#28a745',
        error: '#dc3545',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
