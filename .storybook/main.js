const path = require('path')

module.exports = {
  stories: [
    '../src/stories/*.stories.mdx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        toolbars: false,
      }
    },

    'storybook-addon-themes',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias['@'] = path.resolve(__dirname, '..', 'src')

    // Setup PostCSS to enable Tailwind
    config.module.rules.push({
      test: /\.css$/,
      use: ['postcss-loader'],
      include: path.resolve(__dirname, '../'),
    })

    return config
  },
}
