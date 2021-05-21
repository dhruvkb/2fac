import { Module } from 'vuex'

import { RootState } from '@/store/modules/state'

import { UiState, state } from '@/store/modules/ui/state'
import { mutations } from '@/store/modules/ui/mutations'

export const module: Module<UiState, RootState> = {
  namespaced: true,
  state,
  mutations,
}
