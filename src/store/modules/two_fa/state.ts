import { Account } from '@/models/account'

export interface TwoFaState {
  accounts: Account[]
}

export const state = (): TwoFaState => ({
  accounts: [] as Account[],
})
