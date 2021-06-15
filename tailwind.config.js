module.exports = {
  mode: 'jit',
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        brand: 'var(--ion-color-brand)',
        primary: 'var(--ion-color-primary)',
        success: 'var(--ion-color-success)',
        warning: 'var(--ion-color-warning)',
        danger: 'var(--ion-color-danger)',
      },
      textColor: {
        1: 'var(--l-1)',
        2: 'var(--l-2)',
        3: 'var(--l-3)',
      },
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
