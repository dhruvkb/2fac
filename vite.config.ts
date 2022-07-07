import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { VitePWA } from 'vite-plugin-pwa'

/**
 * @see {@link https://vitejs.dev/config/ | Config reference}
 */
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: 'auto',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/api\/icons/,
            handler: 'CacheFirst',
            options: {
              cacheName: '2fac-icons',
              expiration: {
                maxAgeSeconds: 604800,
              },
            },
          },
        ],
      },
      manifest: {
        name: '2Fac',
        short_name: '2Fac',
        description: '2Fac is a better time-based OTP generator.',
        theme_color: '#ffffff',
        orientation: 'portrait',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'android-chrome-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'android-chrome-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      // Also see `paths` in `tsconfig.json`
      '@': resolve(__dirname, './src'),
    },
  },
})
