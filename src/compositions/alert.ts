import { alertController } from '@ionic/vue'

interface Button {
  text: string
  handler: () => void
}

export interface AlertComposition {
  showDangerAlert: (
    header: string,
    message: string,
    dangerButton: Button
  ) => void
}

export const alert = (): AlertComposition => {
  const showDangerAlert = async (
    header: string,
    message: string,
    dangerButton: Button,
  ) => {
    const alertElement = await alertController.create({
      header,
      message,
      cssClass: 'alert-controller',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          cssClass: '!text-danger', // Higher specificity to override default
          ...dangerButton,
        },
      ],
    })
    return alertElement.present()
  }

  return {
    showDangerAlert,
  }
}
