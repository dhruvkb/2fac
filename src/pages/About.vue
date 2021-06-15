<template>
  <IonPage>
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            :default-href="settingsLink"
            :text="isPlatform('ios') ? 'Settings' : null"/>
        </IonButtons>
        <IonTitle>About</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <div class="h-full flex flex-col">
        <div class="flex-grow">
          <IonSlides class="h-full">
            <IonSlide
              v-for="(feature, index) in features"
              :key="index">
              <div class="text-base">
                <img
                  class="!h-64 mx-auto"
                  :src="feature.image.path"
                  :alt="feature.image.alt">
                <p class="ion-padding-horizontal my-4">{{ feature.description }}</p>
              </div>
            </IonSlide>
          </IonSlides>
        </div>
        <p class="opacity-50 text-xs text-center ion-padding-horizontal py-4">
          Illustrations from
          <a
            class="underline"
            href="https://icons8.com/illustrations"
            target="_blank">Ouch!</a>
        </p>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonSlide,
    IonSlides,
    IonTitle,
    IonToolbar,
    isPlatform,
  } from '@ionic/vue'

  import uiux from '@/assets/illustrations/uiux.png'
  import local from '@/assets/illustrations/local.png'
  import ownership from '@/assets/illustrations/ownership.png'
  import free from '@/assets/illustrations/free.png'
  import access from '@/assets/illustrations/access.png'
  import developer from '@/assets/illustrations/developer.png'

  export default defineComponent({
    name: 'Settings',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonButtons,
      IonBackButton,
      IonTitle,
      IonContent,
      IonSlides,
      IonSlide,
    },
    setup() {
      const router = useRouter()

      const settingsLink = router.resolve({ name: 'settings' }).href
      const features = [
        {
          image: {
            path: uiux,
            alt: 'Person with six hands holding designer tools',
          },
          description: '2Fac is designed with utmost attention to detail for a '
            + 'user experience that sparks joy.',
        },
        {
          image: {
            path: local,
            alt: 'Person unlocking a padlock for another',
          },
          description: 'Your auth data in 2Fac never leaves your device and is '
            + 'not stored or transmitted to the cloud.',
        },
        {
          image: {
            path: ownership,
            alt: 'Person unlocking a padlock for another',
          },
          description: 'Your auth data always belongs to you and is only '
            + 'accessed by 2Fac with your explicit permission.',
        },
        {
          image: {
            path: free,
            alt: 'Person holding a cage with the bird missing',
          },
          description: '2Fac does not lock you in. You can freely export your '
            + 'data and manage it yourself.',
        },
        {
          image: {
            path: access,
            alt: 'Person flying through space among planets and moons',
          },
          description: '2Fac is built on web technologies and runs on any '
            + 'device that has a web browser.',
        },
        {
          image: {
            path: developer,
            alt: 'Person writing code hunched over a computer',
          },
          description: 'Hope you enjoy using 2Fac just as much I enjoyed '
            + 'building it!',
        },
      ]

      return {
        isPlatform,

        settingsLink,
        features,
      }
    },
  })
</script>
