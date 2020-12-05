import { firebase } from '@firebase/app'
import '@firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBC-FVDCMmptt03XqJFnzoVEOE5Np7fWpw',
  databaseURL: 'gs://bridge-africa-shop.appspot.com',
  authDomain: 'bridge-africa-shop.firebaseapp.com',
  projectId: 'bridge-africa-shop',
  storageBucket: 'bridge-africa-shop.appspot.com',
  messagingSenderId: '308223678364'
})

export const db = firebaseApp.firestore()
