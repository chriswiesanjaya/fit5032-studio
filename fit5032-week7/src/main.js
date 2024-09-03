import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCIRNULSA7GiRotR1fxkvX3kjujCRfa51g',
  authDomain: 'week7-christian-7e8af.firebaseapp.com',
  projectId: 'week7-christian-7e8af',
  storageBucket: 'week7-christian-7e8af.appspot.com',
  messagingSenderId: '920979140513',
  appId: '1:920979140513:web:9f1fce5d21fd459df325e0'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
