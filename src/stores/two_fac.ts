import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Account, type AccountInterface } from '@/models/account'

export const useTwoFac = defineStore('two_fac', () => {
  const accounts = ref<Account[]>([])

  const accountsJson = computed(() => {
    const json = JSON.stringify(
      accounts.value.sort((a, b) => {
        let diff = 0
        if (a.site && b.site) {
          diff = a.site.localeCompare(b.site)
        }
        if (!diff && a.username && b.username) {
          diff = a.username.localeCompare(b.username)
        }
        return diff
      }),
      null,
      2, // spaces for indentation
    )
    return `${json}\n`
  })

  const clearAccounts = () => {
    accounts.value = []
  }
  const loadAccounts = (accPojos: AccountInterface[]) => {
    accounts.value.push(...accPojos.map((accPojo) => Account.fromPojo(accPojo)))
  }
  const updateAccounts = () => {
    accounts.value.forEach((account) => account.updateOtp())
  }
  const addAccount = (account: Account) => {
    accounts.value.push(account)
  }
  const updateAccount = (uuid: string, accPojo: AccountInterface) => {
    const account = accounts.value.find((acc) => acc.uuid === uuid)
    if (account) {
      account.updateFromPojo(accPojo)
    }
  }
  const removeAccount = (uuid: string) => {
    accounts.value = accounts.value.filter((acc) => acc.uuid !== uuid)
  }

  return {
    accounts,
    accountsJson,

    clearAccounts,
    loadAccounts,
    updateAccounts,
    addAccount,
    updateAccount,
    removeAccount,
  }
}, {
  persist: {
    key: '2fac',
    serializer: {
      serialize: JSON.stringify,
      deserialize(text: string) {
        const data = JSON.parse(text)
        data.accounts ??= []
        data.accounts = data.accounts
          .map((accountPojo: AccountInterface) => Account.fromPojo(accountPojo))
        return data
      },
    },
  },
})
