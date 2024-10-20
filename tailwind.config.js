/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5BBAD4',
        secondary: '#46A5C1',
        paper: '#efefef',
        star: '#FC980D',
        success: '#28a745',
        error: '#dc3545',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
