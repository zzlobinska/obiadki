// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcuDjikhbP49-nn-7qACrHbRrAPPIJszc',
  authDomain: 'obiadki-34c9c.firebaseapp.com',
  databaseURL: 'https://obiadki-34c9c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'obiadki-34c9c',
  storageBucket: 'obiadki-34c9c.appspot.com',
  messagingSenderId: '677707257782',
  appId: '1:677707257782:web:f1a1f4c3efa81e73859317',
  measurementId: 'G-3WYSP06WNZ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);