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
    screens: {
      mp: '480px',
      tp: '600px',
      tl: '900px',
      dr: '1200px',
      dw: '1800px',
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
}
