const screenSizes = require('./src/constants/screen_sizes')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,ts,css}',
  ],
  theme: {
    extend: {
      spacing: {
        '2px': '2px',
      },
      borderWidth: {
        3: '3px',
      },
    },
    screens: Object.fromEntries(
      Object.entries(screenSizes.screenSizes)
        .map(([k, v]) => [k, v === 0 ? `${v}` : `${v}px`]),
    ),
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
}
