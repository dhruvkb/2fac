<template>
  <div class="file">
    <h2 class="font-bold text-3xl">Self-managed</h2>
    <p class="mt-4">
      You can export your secrets as a file, and import it to get your accounts
      set up on a new device. No information, other than this file, is needed.
    </p>

    <div class="grid tl:grid-cols-2 gap-2 mt-4">
      <div class="tl:pr-2">
        <h3 class="font-bold text-2xl">Import</h3>
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
            tabindex="0"
            class="button text-blue-900 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500 cursor-pointer"
            for="file">
            Choose</label>
          <span
            v-if="file"
            class="ml-2">
            {{ file.name }}
          </span>
        </div>
        <div class="flex items-center mt-4">
          <button
            class="button text-blue-900 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500"
            :disabled="!file"
            @click="readFromFile">
            Import
          </button>
          <span
            v-if="outcome"
            class="ml-2"
            :class="outcome.isSuccessful ? 'text-green-600' : 'text-red-600'">
            {{ outcome.message }}
          </span>
        </div>
      </div>

      <div class="tl:pl-2 tl:border-l border-gray-200">
        <h3 class="font-bold text-2xl">Export</h3>
        <p class="mt-4">This will export and download a JSON file.</p>
        <div class="mt-4">
          <button
            class="button text-blue-900 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500"
            @click="writeToFile">
            Export
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mapGetters, mapMutations } from 'vuex'

  import { Outcome } from '@/models/outcome'
  import { AccountInterface } from '@/models/account'

  interface FileInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  export default defineComponent({
    name: 'File',
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
        reader.onloadend = () => {
          (this.$refs.fileInput as HTMLInputElement).value = ''
          this.file = null
        }
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
