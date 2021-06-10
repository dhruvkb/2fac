import { ref, Ref } from 'vue'

export interface ModalComposition {
  isModalOpen: Ref<boolean>
  setModalVisible: (isVisible: boolean) => void
}

export const modal = (): ModalComposition => {
  const isModalOpen = ref(false)
  const setModalVisible = async (isVisible: boolean) => {
    isModalOpen.value = isVisible
  }

  return {
    isModalOpen,
    setModalVisible,
  }
}
