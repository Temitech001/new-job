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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
