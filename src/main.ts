import { createApp } from 'vue'

import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'

import App from '@/App.vue'

import '@/styles/index.css' // Tailwind

const app = createApp(App)

app
  .use(router)
  .use(store)
  .mount('div#app__slot')
