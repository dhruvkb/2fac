module.exports = {
  mode: 'jit',
  darkMode: 'media',
  theme: {
    extend: {
      minWidth: {
        14: '3.5rem',
      },
      maxWidth: {
        24: '6rem',
      },
      borderWidth: {
        DEFAULT: 'var(--ion-border-width)',
      },
      transitionProperty: {
        'max-w': 'max-width',
      },
    },
  },
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,ts,css,mdx}',
  ],
}
