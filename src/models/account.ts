import { TOTP } from 'otpauth'

function uuid() {
  return ([1e7, 1e3, 4e3, 8e3, 1e11].join('-')).replace(/[018]/g, (match) => {
    const num = parseInt(match, 10)
    // eslint-disable-next-line no-bitwise
    return (num ^ Math.random() * 16 >> num / 4).toString(16)
  })
}

export interface AccountInterface {
  secret: string

  site?: string
  username?: string
  icon?: string
}

export class Account implements AccountInterface {
  uuid: string

  secret: string

  site?: string
  username?: string
  icon?: string

  totp: TOTP
  currentOtp!: string

  constructor(secret: string) {
    this.uuid = uuid()
    this.secret = secret
    this.totp = new TOTP({
      secret: secret.replaceAll(' ', ''),
    })
    this.updateOtp()
  }

  get pojo(): AccountInterface {
    return {
      site: this.site,
      username: this.username,
      icon: this.icon,
      secret: this.secret,
    }
  }

  toJSON(): AccountInterface {
    return this.pojo
  }

  updateOtp(): void {
    this.currentOtp = this.totp.generate()
  }

  updateFromPojo(pojo: AccountInterface): void {
    this.site = pojo.site
    this.username = pojo.username
    this.icon = pojo.icon
  }

  static fromPojo(pojo: AccountInterface): Account {
    const account = new Account(pojo.secret)
    account.updateFromPojo(pojo)
    return account
  }
}
