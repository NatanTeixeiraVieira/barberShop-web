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
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
