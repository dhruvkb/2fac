export interface UiState {
  currentPage: string
  isHeadingIntersecting: boolean
  tokens: {
    isCloseToEnd: boolean
    isEditing: boolean
  }
}

export const state = (): UiState => ({
  currentPage: '',
  isHeadingIntersecting: false,
  tokens: {
    isCloseToEnd: false,
    isEditing: false,
  },
})
