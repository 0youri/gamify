/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Michroma', 'sans-serif'],
      },
      colors: {
        'gray': '#7A7A7A',
        'dark-gray-100': '#696969',     
        'dark-gray-200': '#575757',  
        'dark-gray-400': '#464646', 
        'darkgray-600': '#343434',
        'dark-gray-800': '#232323',
        'dark': '#111111',

      }
    },
  },
  plugins: [],
   
}