import { createApp } from 'vue'

import '@/registerServiceWorker'
import router from '@/router'
import App from '@/App.vue'

createApp(App)
  .use(router)
  .mount('div#app__slot')
