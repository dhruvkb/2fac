/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,vue,js,ts}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        brand: 'var(--ion-color-brand)',
        'brand-contrast': 'var(--ion-color-brand-contrast)',
        primary: 'var(--ion-color-primary)',
        'primary-contrast': 'var(--ion-color-primary-contrast)',
        success: 'var(--ion-color-success)',
        'success-contrast': 'var(--ion-color-success-contrast)',
        warning: 'var(--ion-color-warning)',
        'warning-contrast': 'var(--ion-color-warning-contrast)',
        danger: 'var(--ion-color-danger)',
        'danger-contrast': 'var(--ion-color-danger-contrast)',
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
      outline: false,
      borderWidth: {
        DEFAULT: 'var(--ion-border-width)',
      },
      transitionProperty: {
        'max-w': 'max-width',
      },
    },
  },
}
