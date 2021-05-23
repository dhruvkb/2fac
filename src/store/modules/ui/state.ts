export interface UiState {
  currentPage: string
  isHeadingIntersecting: boolean
  tokens: {
    isCloseToEnd: boolean
    isEditing: boolean
  }
  icons: Record<string, string>
}

export const state = (): UiState => ({
  currentPage: '',
  isHeadingIntersecting: false,
  tokens: {
    isCloseToEnd: false,
    isEditing: false,
  },
  icons: {} as Record<string, string>,
})
