import {
  ActionTree,
  Commit,
} from 'vuex'

import { UiState } from '@/store/modules/ui/state'
import { RootState } from '@/store/modules/state'

export interface UiActionTree<S, RS> extends ActionTree<S, RS> {
  fetchIcon(context: { state: S, commit: Commit }, payload: { name: string }): void
}

export const actions: UiActionTree<UiState, RootState> = {
  async fetchIcon({ commit }, payload) {
    const url = `https://unpkg.com/bootstrap-icons@1.5.0/icons/${payload.name}.svg`
    const res = await fetch(url)
    if (res.ok) {
      const svgContent = await res.text()
      commit('setIcon', {
        name: payload.name,
        svgContent,
      })
    }
  },
}
