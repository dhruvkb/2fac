import { TwoFaState } from '@/store/modules/two_fa/state'
import { UiState } from '@/store/modules/ui/state'

export interface RootState {
  twoFa: TwoFaState
  ui: UiState
}
