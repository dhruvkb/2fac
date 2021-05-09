import * as Otpauth from 'otpauth'

export interface AccountInterface {
  secret: string

  site?: string
  username?: string
  icon?: string
}

export class Account implements AccountInterface {
  secret: string

  site?: string
  username?: string
  icon?: string

  totp: Otpauth.TOTP
  currentOtp!: string

  constructor(secret: string) {
    this.secret = secret
    this.totp = new Otpauth.TOTP({
      secret: secret.replaceAll(' ', ''),
    })
    this.updateOtp()
  }

  get slug(): string {
    const fqn = `${this.site}-${this.username}`
    return fqn
      .toLocaleLowerCase()
      .replace(' ', '-')
      .replace(/[^\w-]+/g, '')
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

  static fromPojo(pojo: AccountInterface): Account {
    const account = new Account(pojo.secret)
    account.site = pojo.site
    account.username = pojo.username
    account.icon = pojo.icon
    return account
  }
}
