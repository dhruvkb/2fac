/* eslint-disable import/no-extraneous-dependencies */
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

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
    colors: {
      tx: 'transparent',
      curr: 'current',
      white: 'white',
      black: 'black',

      // Accents
      bl: 'rgb(0, 122, 255)',
      gl: 'rgb(52, 199, 89)',
      il: 'rgb(88, 86, 214)',
      ol: 'rgb(255, 149, 0)',
      ml: 'rgb(255, 45, 85)',
      pl: 'rgb(175, 82, 222)',
      rl: 'rgb(255, 59, 48)',
      tl: 'rgb(90, 200, 250)',
      yl: 'rgb(255, 204, 0)',

      bd: 'rgb(10, 132, 255)',
      gd: 'rgb(48, 209, 88)',
      id: 'rgb(94, 92, 230)',
      od: 'rgb(255, 159, 10)',
      md: 'rgb(255, 55, 95)',
      pd: 'rgb(191, 90, 242)',
      rd: 'rgb(255, 69, 58)',
      td: 'rgb(100, 210, 255)',
      yd: 'rgb(255, 214, 10)',

      yellow: colors.amber,
    },
    textColor: (theme) => ({
      ...theme('colors'),

      // Labels
      'll-1': 'rgba(0, 0, 0, 1.00)',
      'll-2': 'rgba(60, 60, 67, 0.60)',
      'll-3': 'rgba(60, 60, 67, 0.30)',
      'll-4': 'rgba(60, 60, 67, 0.18)',

      'ld-1': 'rgba(255, 255, 255, 1.00)',
      'ld-2': 'rgba(235, 235, 245, 0.60)',
      'ld-3': 'rgba(235, 235, 245, 0.30)',
      'ld-4': 'rgba(235, 235, 245, 0.18)',
    }),
    placeholderColor: (theme) => theme('textColor'),
    backgroundColor: (theme) => ({
      ...theme('colors'),

      // Greys
      'gl-0': 'rgb(142, 142, 147)',
      'gl-1': 'rgb(174, 174, 178)',
      'gl-2': 'rgb(199, 199, 204)',
      'gl-3': 'rgb(209, 209, 214)',
      'gl-4': 'rgb(229, 229, 234)',
      'gl-5': 'rgb(242, 242, 247)',
      'gl-6': 'rgb(255, 255, 255)',

      'gd-0': 'rgb(142, 142, 147)',
      'gd-1': 'rgb(99, 99, 102)',
      'gd-2': 'rgb(72, 72, 74)',
      'gd-3': 'rgb(58, 58, 60)',
      'gd-4': 'rgb(44, 44, 46)',
      'gd-5': 'rgb(28, 28, 30)',
      'gd-6': 'rgb(0, 0, 0)',

      // Fills
      'fl-1': 'rgba(120, 120, 128, 0.20)',
      'fl-2': 'rgba(120, 120, 128, 0.16)',
      'fl-3': 'rgba(118, 118, 128, 0.12)',
      'fl-4': 'rgba(116, 116, 128, 0.08)',

      'fd-1': 'rgba(120, 120, 128, 0.36)',
      'fd-2': 'rgba(120, 120, 128, 0.32)',
      'fd-3': 'rgba(118, 118, 128, 0.24)',
      'fd-4': 'rgba(116, 116, 128, 0.18)',
    }),
    borderColor: {
      tx: 'transparent',

      // Separators
      'sep-d': 'rgba(54, 54, 58, 0.65)',
      'sep-l': 'rgba(60, 60, 67, 0.36)',
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
