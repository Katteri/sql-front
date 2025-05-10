/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        buran: ['Buran USSR', 'sans-serif'],
        moscow: ['Moscow Sans', 'sans-serif'],
        emoji: [
          'Noto Color Emoji',
        ],
      },
      colors: {
        'dirty-red': '#691F0C',
        'wow-red': '#DC3C0C',
        sand: '#F8F2DE',
        'wow-gray': '#7A7A78',
        'wow-white': '#E1E1E1',
        'wow-black': '#1D1816',
      },
    },
  },
  plugins: [],
};
