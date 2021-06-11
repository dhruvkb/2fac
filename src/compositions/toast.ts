import { toastController } from '@ionic/vue'

export interface ToastComposition {
  showToast: (message: string) => void
}

export const toast = (): ToastComposition => {
  const showToast = async (message: string) => {
    const toastElement = await toastController.create({
      message,
      duration: 3e3,
      color: 'dark',
    })
    return toastElement.present()
  }

  return {
    showToast,
  }
}
