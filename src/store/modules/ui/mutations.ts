import { MutationTree } from 'vuex'

import { UiState } from '@/store/modules/ui/state'

export interface TwoFaMutationTree<S> extends MutationTree<S> {
  setIsHeadingIntersecting(state: S, payload: { isHeadingIntersecting: boolean }): void

  setCurrentPage(state: S, payload: { currentPage: string }): void

  // Tokens
  setIsCloseToEnd(state: S, payload: { isCloseToEnd: boolean }): void

  setIsEditing(state: S, payload: { isEditing: boolean }): void

  // Icons
  setIcon(state: S, payload: { svgContent: string }): void
}

export const mutations: TwoFaMutationTree<UiState> = {
  setIsHeadingIntersecting(state: UiState, payload: { isHeadingIntersecting: boolean }) {
    state.isHeadingIntersecting = payload.isHeadingIntersecting
  },
  setCurrentPage(state: UiState, payload: { currentPage: string }) {
    state.currentPage = payload.currentPage
  },

  // Tokens
  setIsCloseToEnd(state: UiState, payload: { isCloseToEnd: boolean }) {
    state.tokens.isCloseToEnd = payload.isCloseToEnd
  },
  setIsEditing(state: UiState, payload: { isEditing: boolean }) {
    state.tokens.isEditing = payload.isEditing
  },

  // Icons
  setIcon(state: UiState, payload: { name: string, svgContent: string }) {
    state.icons[payload.name] = payload.svgContent
  },
}
