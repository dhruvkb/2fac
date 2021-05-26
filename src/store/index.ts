import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { module as twoFa } from '@/store/modules/two_fa/index'
import { module as ui } from '@/store/modules/ui/index'

import { Account, AccountInterface } from '@/models/account'

const plugins = []
plugins.push(createPersistedState({
  key: '2fac',
  getState(key, storage) {
    const text = storage.getItem(key)
    if (!text) {
      return undefined
    }

    try {
      const data = JSON.parse(text)
      data.accounts ??= []
      data.accounts = data.accounts
        .map((account: AccountInterface) => Account.fromPojo(account))
      return {
        twoFa: data,
      }
    } catch (ex) {
      console.error(ex)
    }

    return undefined
  },
  setState(key, state, storage) {
    const twoFaState = state.twoFa
    storage.setItem(key, JSON.stringify(twoFaState))
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
