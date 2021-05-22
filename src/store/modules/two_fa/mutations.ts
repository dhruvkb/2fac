import { MutationTree } from 'vuex'

import { Account, AccountInterface } from '@/models/account'
import { TwoFaState } from '@/store/modules/two_fa/state'

export interface TwoFaMutationTree<S> extends MutationTree<S> {
  clearAccounts(state: S): void

  loadAccounts(state: S, payload: { accPojos: AccountInterface[] }): void

  updateAccounts(state: S): void

  addAccount(state: S, payload: { account: Account }): void

  updateAccount(state: S, payload: { uuid: string, accPojo: AccountInterface }): void

  removeAccount(state: S, payload: { uuid: string }): void
}

export const mutations: TwoFaMutationTree<TwoFaState> = {
  clearAccounts(state: TwoFaState) {
    state.accounts = []
  },
  loadAccounts(state: TwoFaState, payload: { accPojos: AccountInterface[] }) {
    payload.accPojos.forEach((accPojo: AccountInterface) => {
      state.accounts.push(Account.fromPojo(accPojo))
    })
  },
  updateAccounts(state: TwoFaState) {
    state.accounts.forEach((acc) => {
      acc.updateOtp()
    })
  },
  addAccount(state: TwoFaState, payload: { account: Account }) {
    state.accounts.push(payload.account)
  },
  updateAccount(state: TwoFaState, payload: { uuid: string; accPojo: AccountInterface }) {
    const account = state.accounts.find((acc) => acc.uuid === payload.uuid)
    if (account) {
      account.updateFromPojo(payload.accPojo)
    }
  },
  removeAccount(state: TwoFaState, payload: { uuid: string }) {
    state.accounts = state.accounts.filter((acc) => acc.uuid !== payload.uuid)
  },
}
