import { Module } from 'vuex'

import { RootState } from '@/store/modules/state'

import { UiState, state } from '@/store/modules/ui/state'
import { mutations } from '@/store/modules/ui/mutations'
import { actions } from '@/store/modules/ui/actions'

export const module: Module<UiState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}
