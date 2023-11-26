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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
In this example, we've imported GoogleAuthProvider from Firebase and created a googleProvider instance.

Update Your Component:

Now that you have the googleProvider defined in your Firebase configuration, you can use it in your component. Make sure to import it at the beginning of your component file:

javascript
Copy code
import { auth, googleProvider } from '../../server/firebase'; // Adjust the path as needed
With this import, you should no longer encounter the "googleProvider is not defined" error.

Handle Google Sign-In:

Modify your handleGoogleSignIn function to use the googleProvider:

javascript
Copy code
const handleGoogleSignIn = async () => {
  try {
    // Sign in with Google using the googleProvider
    await auth.signInWithPopup(googleProvider);
    console.log('User signed in with Google.');
    // Add any further actions you want to perform after successful sign-in.
  } catch (error) {
    console.error('Google Sign-in error:', error.message);
  }
};
With these changes, your code should work correctly, and you'll be able to handle Google Sign-In with Firebase. Make sure to replace "YOUR_API_KEY", "YOUR_AUTH_DOMAIN", and other placeholders in the firebaseConfig.js file with your actual Firebase project settings.






// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
