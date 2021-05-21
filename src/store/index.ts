import { createLogger, createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { module as twoFa } from '@/store/modules/two_fa/index'
import { module as ui } from '@/store/modules/ui/index'

import { Account, AccountInterface } from '@/models/account'

const plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.push(createLogger({}))
}
plugins.push(createPersistedState({
  key: '2fac',
  getState(key, storage) {
    const text = storage.getItem(key)
    if (!text) {
      return undefined
    }

    try {
      const data = JSON.parse(text)
      data.twoFa.accounts ??= []
      data.twoFa.accounts = data.twoFa.accounts
        .map((account: AccountInterface) => Account.fromPojo(account))
      return data
    } catch (ex) {
      console.error(ex)
    }

    return undefined
  },
}))

const store = createStore({
  plugins,
  modules: {
    twoFa,
    ui,
  },
})

export default store
