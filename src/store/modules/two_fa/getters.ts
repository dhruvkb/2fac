import { GetterTree } from 'vuex'

import { RootState } from '@/store/modules/state'
import { TwoFaState } from '@/store/modules/two_fa/state'

export interface TwoFaGetterTree<S, RS> extends GetterTree<S, RS> {
  accountsJson(state: S): string
}

export const getters: TwoFaGetterTree<TwoFaState, RootState> = {
  accountsJson(state: TwoFaState): string {
    return JSON.stringify(
      state.accounts.map((acc) => acc.pojo),
      null,
      2, // spaces for indentation
    )
  },
}
