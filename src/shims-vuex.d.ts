/* eslint-disable */
import { Store } from 'vuex'
import { RootState } from '@/store/modules/state'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}
