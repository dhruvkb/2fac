<template>
  <div class="file">
    <h3 class="font-bold text-2xl">Self-managed</h3>
    <p class="mt-4">
      You can export your secrets as a file, and import it to get your accounts
      set up on a new device. No information, other than this file, is needed.
    </p>

    <div class="grid tl:grid-cols-2 gap-2 mt-4">
      <div class="tl:pr-2">
        <h4 class="font-bold text-xl">Import</h4>
        <p class="mt-4">Please upload a valid JSON file.</p>
        <div class="flex items-center mt-4">
          <input
            class="hidden"
            id="file"
            accept=".json"
            type="file"
            @change="updateFile"
            ref="fileInput">
          <label
            class="cursor-pointer"
            for="file">
            <ButtonControl class="pointer-events-none">Choose</ButtonControl>
          </label>
          <span
            v-if="file"
            class="ml-2">
            {{ file.name }}
          </span>
          <button
            v-if="file"
            class="text-rl dark:text-rd rounded-full ml-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-rl dark:focus-visible:ring-rd"
            @click="clearFile">
            <Icon name="x"/>
          </button>
        </div>
        <div class="flex items-center mt-4">
          <ButtonControl
            :disabled="!file"
            @click="readFromFile">
            Import
          </ButtonControl>
          <span
            v-if="outcome"
            class="ml-2"
            :class="[...outcome.isSuccessful ? ['text-green-600'] : ['text-red-600']]">
            {{ outcome.message }}
          </span>
        </div>
      </div>

      <div class="tl:pl-2 tl:border-l border-sep-l dark:border-sep-d">
        <h4 class="font-bold text-xl">Export</h4>
        <p class="mt-4">This will export and download a JSON file.</p>
        <div class="mt-4">
          <ButtonControl @click="writeToFile">
            Export
          </ButtonControl>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters, mapMutations } from 'vuex'

  import ButtonControl from '@/components/ButtonControl.vue'

  import { Outcome } from '@/models/outcome'
  import { AccountInterface } from '@/models/account'
  import Icon from '@/components/Icon.vue'

  interface FileInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  export default defineComponent({
    name: 'File',
    components: {
      Icon,
      ButtonControl,
    },
    data() {
      return {
        outcome: null as Outcome<AccountInterface[]> | null,
        file: null as Blob | null,
      }
    },
    computed: {
      ...mapGetters('twoFa', [
        'accountsJson',
      ]),
    },
    methods: {
      updateFile(event: FileInputEvent) {
        const [file] = event.target.files ?? []
        this.file = file
      },
      clearFile() {
        (this.$refs.fileInput as HTMLInputElement).value = ''
        this.file = null
      },
      readFromFile() {
        if (this.file === null) {
          return
        }
        const reader = new FileReader()
        reader.onload = () => {
          let outcome: Outcome<AccountInterface[]>
          try {
            const accPojos = JSON.parse(reader.result as string)
            this.clearAccounts()
            this.loadAccounts({ accPojos })
            outcome = {
              isSuccessful: true,
              message: 'Great success!',
              data: accPojos,
            }
          } catch (ex) {
            outcome = {
              isSuccessful: false,
              message: ex.message,
            }
          }
          this.outcome = outcome
        }
        reader.onerror = () => {
          console.error(reader.error)
        }
        reader.onloadend = this.clearFile
        reader.readAsText(this.file)
      },
      writeToFile() {
        const blob = new Blob([this.accountsJson], { type: 'application/json' })
        const blobUrl = URL.createObjectURL(blob)

        const anchor = document.createElement('a')
        anchor.href = blobUrl
        anchor.download = '2fac.json'
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)

        URL.revokeObjectURL(blobUrl)
      },
      ...mapMutations('twoFa', [
        'clearAccounts',
        'loadAccounts',
      ]),
    },
  })
</script>
