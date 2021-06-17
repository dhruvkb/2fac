module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.compilerOptions = {
          ...options.compilerOptions,
        }
        return options
      })
  },
  pwa: {
    name: process.env.NODE_ENV === 'production' ? '2Fac' : '2Fac (dev)',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    manifestOptions: {
      orientation: 'portrait',
    },
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: /.+\/api\/icons/, // Cross-origin regex must match from the beginning
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
  },
}
