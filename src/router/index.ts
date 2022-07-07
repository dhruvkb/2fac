import type { RouteRecordRaw } from 'vue-router'
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
        component: () => import('@/pages/Tokens.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/pages/Settings.vue'),
      },
      {
        path: 'settings/about',
        name: 'about',
        component: () => import('@/pages/About.vue'),
      },
      {
        path: 'settings/github',
        name: 'gitHub',
        component: () => import('@/pages/GitHub.vue'),
      },
      {
        path: 'settings/local',
        name: 'local',
        component: () => import('@/pages/Local.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
