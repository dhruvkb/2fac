import { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from '@ionic/vue-router'

import Tabs from '@/views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: { name: 'tokens' },
      },
      {
        path: 'tokens',
        name: 'tokens',
        component: () => import(/* webpackChunkName: "tokens" */ '@/pages/Tokens.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '@/pages/Settings.vue'),
      },
      {
        path: 'settings/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/pages/About.vue'),
      },
      {
        path: 'settings/github',
        name: 'gitHub',
        component: () => import(/* webpackChunkName: "github" */ '@/pages/GitHub.vue'),
      },
      {
        path: 'settings/local',
        name: 'local',
        component: () => import(/* webpackChunkName: "local" */ '@/pages/Local.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
