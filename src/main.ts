import { createApp } from 'vue'

import '@/registerServiceWorker'
import router from '@/router'
import App from '@/App.vue'

import '@/styles/index.css' // Tailwind

createApp(App)
  .use(router)
  .mount('div#app__slot')
