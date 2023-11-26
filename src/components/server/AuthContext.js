import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase'; // Import your Firebase authentication module

// Create a new context
export const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create an AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state

  useEffect(() => {
    // Add a Firebase authentication observer to listen for changes in the user's sign-in status
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser); // Set the user state based on the Firebase user object
    });

    // Cleanup the observer when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Add the sign-out function
  const signOut = async () => {
    try {
      await auth.signOut(); // Sign out the user using Firebase Auth
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  // Value to provide in the context, including the signOut function
  const contextValue = {
    user,
    signOut, // Include the sign-out function
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
