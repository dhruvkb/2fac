import { createApp } from 'vue'

import '@/registerServiceWorker'
import router from '@/router'
import App from '@/App.vue'

import '@/styles/index.css' // Tailwind

const app = createApp(App)

app.config.isCustomElement = (tag: string): boolean => [
  'ion-icon',
].includes(tag)

app
  .use(router)
  .mount('div#app__slot')
