import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDODT5-vOTYs6McEqDh8sTtZjehb9KlnOw',
  authDomain: 'localhost',
  projectId: 'jobconnect360bypeace',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const googleProvider = new Goo

export { auth, googleProvider };