/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        buran: ['Buran USSR', 'sans-serif'],
        imperial: ['Imperial Web', 'sans-serif'],
      },
      colors: {
        'dirty-red': '#691F0C',
        'wow-red': '#DC3C0C',
        sand: '#D3C0B2',
        'wow-gray': '#7A7A78',
        'wow-white': '#E1E1E1',
        'wow-black': '#1D1816',
      },
    },
  },
  plugins: [],
};
