const flatMap = require('lodash/flatMap')

const [safeTop, safeRight, safeBottom, safeLeft] = [
  'top',
  'right',
  'bottom',
  'left',
].map((dir) => `env(safe-area-inset-${dir})`)

module.exports = ({
  addUtilities,
  e,
  config,
}) => {
  const paddings = config('theme.paddingSafe.padding', config('theme.padding', {}))
  const variants = config('variants.paddingSafe', config('variants.padding', {}))
  const suffix = 'safe'
  const generators = [
    (size, modifier) => ({
      [`.${e(`p-${modifier}-${suffix}`)}`]: {
        'padding-top': `max(${size}, ${safeTop})`,
        'padding-bottom': `max(${size}, ${safeBottom})`,
        'padding-left': `max(${size}, ${safeLeft})`,
        'padding-right': `max(${size}, ${safeRight})`,
      },

      [`.${e(`py-${modifier}-${suffix}`)}`]: {
        'padding-top': `max(${size}, ${safeTop})`,
        'padding-bottom': `max(${size}, ${safeBottom})`,
      },
      [`.${e(`px-${modifier}-${suffix}`)}`]: {
        'padding-left': `max(${size}, ${safeLeft})`,
        'padding-right': `max(${size}, ${safeRight})`,
      },

      [`.${e(`pt-${modifier}-${suffix}`)}`]: {
        'padding-top': `max(${size}, ${safeTop})`,
      },
      [`.${e(`pr-${modifier}-${suffix}`)}`]: {
        'padding-right': `max(${size}, ${safeRight})`,
      },
      [`.${e(`pb-${modifier}-${suffix}`)}`]: {
        'padding-bottom': `max(${size}, ${safeBottom})`,
      },
      [`.${e(`pl-${modifier}-${suffix}`)}`]: {
        'padding-left': `max(${size}, ${safeLeft})`,
      },
    }),
  ]

  const utilities = flatMap(generators, (generator) => flatMap(paddings, generator))

  addUtilities(utilities, variants)
}
