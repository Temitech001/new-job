import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { auth, googleProvider, signInWithPopup } from '../../server/firebase'; // Adjust the path as needed

const SignIn = () => {
  const [email, setEmail] = useState('');
  const history = useHistory(); // Initialize history

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleContinueClick = () => {
    console.log('Continue button clicked with email:', email);
  };

  const isButtonActive = !!email;

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google using the signInWithPopup method
      await signInWithPopup(auth, googleProvider);
      console.log('User signed in with Google.');

      // Redirect user to the homepage after successful sign-in
      history.push('/'); // Use history to navigate to '/'
    } catch (error) {
      console.error('Google Sign-in error:', error.message);
    }
  };

  return (
    <div className="bg-gray-100 py-8">
      <Link to="/" className="text-xl font-semibold text-blue-600">
        <img
          width="200px"
          src={process.env.PUBLIC_URL + `360.png`}
          alt="Logo"
          className="mx-auto"
        />
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-md md:w-2/4 mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to take the next step?
        </h2>
        <p className="text-gray-500 mb-6">
          Create an account or sign in.
        </p>
        {/* ... (rest of the code) */}
        <button
          onClick={handleGoogleSignIn}
          className="text-black border-solid border-2 border-grey-400 rounded-lg py-2 px-4 mb-4 w-full hover:bg-gray-100 flex content-center"
        >
          <FcGoogle /> <span className='mx-auto'>Continue with Google</span>
        </button>
        {/* ... (rest of the code) */}
      </div>
    </div>
  );
};

export default SignIn;
