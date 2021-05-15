<template>
  <div>
    <div class="px-4">
      <Form
        v-model:secret="accountPojo.secret"
        v-model:site="accountPojo.site"
        v-model:username="accountPojo.username"
        v-model:icon="accountPojo.icon"
        @getIcon="updateIcon"/>
    </div>
    <div class="tp:px-4">
      <Card
        class="mt-4"
        :site="accountPojo.site"
        :username="accountPojo.username"
        :icon-svg="iconSvg"
        :otp="otp"/>
    </div>
    <div class="px-4 mt-4">
      <button
        class="button text-green-600 bg-green-100 hover:bg-green-200 focus-visible:ring-green-500"
        @click="createAccount">
        Add
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapMutations } from 'vuex'
  import { TOTP } from 'otpauth'

  import Form from '@/tokens/Form.vue'
  import Card from '@/tokens/Card.vue'

  import { Account, AccountInterface } from '@/models/account'
  import { IconSvg } from '@/models/icon_svg'

  import { getIcon } from '@/support/simple_icons'

  export default defineComponent({
    name: 'Add',
    components: {
      Form,
      Card,
    },
    data() {
      return {
        accountPojo: {
          secret: '',
          site: '',
          username: '',
          icon: '',
        } as AccountInterface,
        iconSvg: null as IconSvg | null,
        otp: null as string | null,
        totp: null as TOTP | null,
        unsubscribe: null as (() => void) | null,
      }
    },
    watch: {
      'accountPojo.secret': function accountPojoSecret(): void {
        this.setupTotp()
        this.updateOtp()
      },
      'accountPojo.icon': function accountPojoIcon(): void {
        this.updateOtp()
      },
    },
    methods: {
      setupTotp() {
        if (!this.accountPojo.secret) {
          this.totp = null
          return
        }
        this.totp = new TOTP({
          secret: this.accountPojo.secret.replaceAll(' ', ''),
        })
      },
      updateOtp() {
        if (!this.totp) {
          this.otp = null
          return
        }
        this.otp = this.totp.generate()
      },
      async updateIcon() {
        const { icon } = this.accountPojo
        if (!icon) {
          return
        }
        this.iconSvg = await getIcon(icon)
      },
      createAccount() {
        this.addAccount({
          account: Account.fromPojo(this.accountPojo),
        })
        this.$emit('add')
      },
      ...mapMutations('twoFa', [
        'addAccount',
      ]),
    },
    mounted() {
      this.setupTotp()
      this.updateOtp()
      this.unsubscribe = this.$store.subscribe((mutation: { type: string, payload: undefined }) => {
        if (mutation.type === 'twoFa/updateAccounts') {
          this.updateOtp()
        }
      })
    },
    beforeUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe()
      }
    },
  })
</script>
