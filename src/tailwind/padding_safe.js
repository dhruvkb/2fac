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
  const generators = [
    (size, modifier) => {
      const top = { 'padding-top': `max(${size}, ${safeTop})` }
      const right = { 'padding-right': `max(${size}, ${safeRight})` }
      const bottom = { 'padding-bottom': `max(${size}, ${safeBottom})` }
      const left = { 'padding-left': `max(${size}, ${safeLeft})` }

      return {
        [`.${e(`p-${modifier}-safe`)}`]: {
          ...top, ...right, ...bottom, ...left,
        },

        [`.${e(`py-${modifier}-safe`)}`]: {
          ...top, ...bottom,
        },
        [`.${e(`px-${modifier}-safe`)}`]: {
          ...left, ...right,
        },

        [`.${e(`pt-${modifier}-safe`)}`]: top,
        [`.${e(`pr-${modifier}-safe`)}`]: right,
        [`.${e(`pb-${modifier}-safe`)}`]: bottom,
        [`.${e(`pl-${modifier}-safe`)}`]: left,
      }
    },
  ]
  const utilities = flatMap(generators, (generator) => flatMap(paddings, generator))
  const variants = config('variants.paddingSafe', config('variants.padding', {}))
  addUtilities(utilities, variants)
}
