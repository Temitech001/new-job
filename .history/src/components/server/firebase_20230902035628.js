import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getStorage, ref} from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDODT5-vOTYs6McEqDh8sTtZjehb9KlnOw",
  authDomain: "jobconnect360bypeace.firebaseapp.com",
  databaseURL: "https://jobconnect360bypeace-default-rtdb.firebaseio.com",
  projectId: "jobconnect360bypeace",
  storageBucket: "jobconnect360bypeace.appspot.com",
  messagingSenderId: "592158316184",
  appId: "1:592158316184:web:822269c7bf0b1b33ad22ed",
  measurementId: "G-7X5Z1RQ0DN"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const db = getFirestore();
const storage = getStorage();

const folder1Ref = ref(storage, 'cvFile');
const folder2Ref = ref(storage, 'driverLicense');
const folder2BRef = ref(storage, 'driverLicenseB');
const folder3Ref = ref(storage, 'ssnCopy');
onst folder3BRef = ref(storage, 'ssnCopyB');

export { auth, googleProvider, signInWithPopup, db, folder1Ref, folder2Ref,  folder3Ref };
