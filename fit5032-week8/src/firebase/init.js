// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

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
const db = getFirestore()
export default db
