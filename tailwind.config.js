module.exports = {
  mode: 'jit',
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,ts,css}',
  ],
  theme: {
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
