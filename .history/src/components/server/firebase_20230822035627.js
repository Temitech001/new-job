// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);