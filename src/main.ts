import { createApp } from 'vue'

import { IonicVue } from '@ionic/vue'

import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'

import App from '@/App.vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import '@/style/variables.css'
import '@/style/variables_dark.css'
import '@/style/components_ios.css'
import '@/style/components_md.css'

/* Tailwind */
import '@/style/tailwind.css'

const app = createApp(App)

app
  .use(IonicVue)
  .use(router)
  .use(store)

router.isReady().then(() => {
  app.mount('div#app__slot')
})
