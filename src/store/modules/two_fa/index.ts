import { Module } from 'vuex'

import { RootState } from '@/store/modules/state'

import { TwoFaState, state } from '@/store/modules/two_fa/state'
import { mutations } from '@/store/modules/two_fa/mutations'
import { getters } from '@/store/modules/two_fa/getters'

export const module: Module<TwoFaState, RootState> = {
  namespaced: true,
  state,
  mutations,
  getters,
}
