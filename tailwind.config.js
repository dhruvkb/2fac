// eslint-disable-next-line import/no-extraneous-dependencies
const plugin = require('tailwindcss/plugin')

const screenSizes = require('./src/constants/screen_sizes')
const paddingSafe = require('./src/tailwind/padding_safe')

module.exports = {
  mode: 'jit',
  darkMode: 'media',
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,ts,css}',
  ],
  theme: {
    extend: {
      zIndex: {
        '-1': -1,
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
  plugins: [
    plugin(paddingSafe),
  ],
}
