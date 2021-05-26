<template>
  <div class="add">
    <Form
      :lock-secret="!isNew"
      v-model:secret="accountPojo.secret"
      v-model:site="accountPojo.site"
      v-model:username="accountPojo.username"
      v-model:icon="accountPojo.icon"/>
    <div class="flex justify-end tp:justify-start px-4 mt-4">
      <ButtonControl @click="save">
        {{ isNew ? 'Add' : 'Update' }}
      </ButtonControl>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapMutations } from 'vuex'

  import ButtonControl from '@/components/ButtonControl.vue'

  import Form from '@/tokens/Form.vue'

  import {
    Account,
    AccountInterface,
  } from '@/models/account'

  export default defineComponent({
    name: 'AddUpdate',
    components: {
      ButtonControl,
      Form,
    },
    props: {
      account: {
        type: Account,
      },
    },
    data() {
      return {
        accountPojo: {
          secret: '',
          site: '',
          username: '',
          icon: '',
        } as AccountInterface,
      }
    },
    computed: {
      isNew(): boolean {
        return !this.account
      },
    },
    methods: {
      createAccount() {
        if (!this.account) {
          this.addAccount({
            account: Account.fromPojo(this.accountPojo),
          })
        }
        this.$emit('add')
      },
      editAccount() {
        if (this.account) {
          this.updateAccount({
            uuid: this.account.uuid,
            accPojo: this.accountPojo,
          })
        }
        this.$emit('edit')
      },
      save() {
        if (this.isNew) {
          this.createAccount()
        } else {
          this.editAccount()
        }
      },
      ...mapMutations('twoFa', [
        'addAccount',
        'updateAccount',
      ]),
    },
    mounted() {
      if (this.account) {
        this.accountPojo.secret = this.account.secret
        this.accountPojo.site = this.account.site
        this.accountPojo.username = this.account.username
        this.accountPojo.icon = this.account.icon
      }
    },
  })
</script>
