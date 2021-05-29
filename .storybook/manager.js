import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

import logo from '../public/img/storybook.svg'

const theme = create({
  base: 'light',
  brandTitle: '2Fac',
  brandUrl: 'https://2fac.vercel.app',
  brandImage: logo,
})

addons.setConfig({
  theme,
})
