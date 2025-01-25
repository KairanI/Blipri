const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'yellow': '#FFD600',
      'yellow-button': '#FFCC00',
      'white': '#FFFFFF',
      'red': '#CA4754',
      'black-red': '#932E38',
      'grey': '#8F8F8F',
      'word': '#767676',
      'chart': '#535353',
      'black-grey': '#676767',
      'hover-pop-up': '#DDDDDD',
      'pop-up': '#161616',
      'grey-80': 'rgb(143 143 143 / 80%)',
      'opacity-color': 'rgb(143 143 143 / 0%)',
      'black-gray': '#292929',
      'block-black': '#1C1C1C',
      'black': '#000000',
      'hotKeys': '#4B4B4B',
      'hotKeys-black': '#121212',
    },
    fontFamily: {
      'inter-regular': ['Inter-Regular', 'sans-serif'],
      'inter-bold': ['Inter-Bold', 'sans-serif'],
      'inter-medium': ['Inter-Medium', 'sans-serif'],
      'kadwa-bold': ['Kadwa-Bold', 'serif'],
      'jetBrainsMono-regular': ['JetBrainsMono-Regular', 'monospace'],
      'jetBrainsMono-medium': ['JetBrainsMono-Medium', 'monospace'],
    },
    fontSize: {
      mm: '13px',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    screens: {
      'tOne': '1266px',
      'tTwo': '971px',
      'tThree': '761px',
      'rOne': '1340px',
      'rTwo': '1170px',
      'rThree': '910px',
      'rFour': '760px',
      'rFive': '610px',
      'rSix': '500px',
    },
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.flex-center-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.svg-pointer': {
          fill: '#FFFFFF',
          fillOpacity: '1',
        },
        '.svg-active': {
          fill: '#FFD600',
          fillOpacity: '1',
        },
        '.shadow-block': {
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        },
        '.transition-custom': { 
          transition: '3s',
        },
        '.outline-input': { 
          outline: '2px solid #FFFFFF',
        },
      })
    })
  ],
}

