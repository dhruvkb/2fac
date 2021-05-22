import { GetterTree } from 'vuex'

import { RootState } from '@/store/modules/state'
import { TwoFaState } from '@/store/modules/two_fa/state'

export interface TwoFaGetterTree<S, RS> extends GetterTree<S, RS> {
  accountsJson(state: S): string
}

export const getters: TwoFaGetterTree<TwoFaState, RootState> = {
  accountsJson(state: TwoFaState): string {
    const json = JSON.stringify(
      state.accounts.sort((a, b) => {
        let diff = 0
        if (a.site && b.site) {
          diff = a.site.localeCompare(b.site)
        }
        if (!diff && a.username && b.username) {
          diff = a.username.localeCompare(b.username)
        }
        return diff
      }),
      null,
      2, // spaces for indentation
    )
    return `${json}\n`
  },
}
