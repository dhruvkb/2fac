module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: (tag) => [
            'ion-icon',
          ].includes(tag),
        }
        return options
      })
  },
  pwa: {
    name: process.env.NODE_ENV === 'production' ? '2Fac' : '2Fac (dev)',
    appleMobileWebAppCapable: 'yes',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    manifestOptions: {
      orientation: 'portrait',
    },
  },
}
