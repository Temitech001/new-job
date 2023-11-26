import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
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
const db = firebase.firestore();

export { auth, googleProvider, signInWithPopup, db };
