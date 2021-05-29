import { app } from '@storybook/vue3'

import store from '@/store'

import '@/styles/index.css' // Tailwind
import './css/preview.css'

app.use(store)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'Dark',
    list: [
      {
        name: 'Light',
        class: [],
        color: '#ffffff',
      },
      {
        name: 'Dark',
        class: ['dark'],
        color: '#000000',
      },
    ],
    target: 'root',
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '320px',
          height: '640px',
        },
        type: 'mobile',
      },
      tabletPortrait: {
        name: 'Tablet',
        styles: {
          width: '600px',
          height: '900px',
        },
        type: 'tablet',
      },
      desktopRegular: {
        name: 'Desktop (regular)',
        styles: {
          width: '1200px',
          height: 'initial',
        },
        type: 'desktop',
      },
      desktopWide: {
        name: 'Desktop (wide)',
        styles: {
          width: '1800px',
          height: 'initial',
        },
        type: 'desktop',
      },
    },
  },
}
