import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import {
  auth,
  googleProvider,
  signInWithPopup,
  
} from '../../server/firebase'; // Adjust the path as needed
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetStatus, setResetStatus] = useState(null); // To store the password reset status
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Reset the resetStatus when the user edits the email field
    setResetStatus(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('User signed in with Google.');
      navigate('/');
    } catch (error) {
      console.error('Google Sign-in error:', error.message);
    }
  };

  const handleSignInWithEmailAndPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password); // Use signInWithEmailAndPassword
      console.log('User signed in with email and password.');
      navigate('/');
    } catch (error) {
      console.error('Email/Password Sign-in error:', error.message);
    }
  };

  const handleRegisterWithEmailAndPassword = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Use createUserWithEmailAndPassword
      console.log('User registered and signed in with email and password.');
      navigate('/');
    } catch (error) {
      console.error('Email/Password Registration error:', error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email || !email.includes('@')) {
      setResetStatus('Please enter a valid email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email); // Send a password reset email
      setResetStatus('Password reset email sent successfully. Check your email to reset your password.');
    } catch (error) {
      console.error('Password Reset error:', error.message);
      setResetStatus('Password reset failed. Please check your email address and try again.');
    }
  };

  const isSignInButtonActive = !!email && !!password;
  const isRegisterButtonActive = isSignInButtonActive && password.length >= 6; // Adjust the password length requirement as needed

  return (
    <div className="bg-gray-100 py-8">
      <Link to="/" className="text-xl font-semibold text-blue-600">
        <img
          width="250px"
          src={process.env.PUBLIC_URL + 'eelogo.png'}
          alt="Logo"
          className="mx-auto"
        />
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-md md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Ready to take the next step?</h2>
        <p className="text-gray-500 mb-6">Create an account or sign in.</p>
        <p className="text-sm text-gray-400 mb-6">
          By creating an account or logging in, you acknowledge our Cookie and Privacy policies.
        </p>
        <button
          onClick={handleSignInWithGoogle}
          className="text-black border-solid border-2 border-grey-400 rounded-lg py-2 px-4 mb-4 w-full hover:bg-gray-100 flex content-center"
        >
          <FcGoogle /> <span className="mx-auto">Continue with Google</span>
        </button>
        <div className="text-center text-gray-500 text-sm mb-4">OR</div>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className={`bg-blue-500 text-white rounded-g py-2 px-4 w-full ${
            isSignInButtonActive
              ? 'hover:bg-blue-600'
              : 'opacity-50 cursor-not-allowed filter grayscale'
          }`}
          onClick={handleSignInWithEmailAndPassword}
          disabled={!isSignInButtonActive}
        >
          Sign In
        </button>
        <button
          className={`bg-green-500 text-white rounded-g py-2 px-4 w-full mt-4 ${
            isRegisterButtonActive
              ? 'hover:bg-green-600'
              : 'opacity-50 cursor-not-allowed filter grayscale'
          }`}
          onClick={handleRegisterWithEmailAndPassword}
          disabled={!isRegisterButtonActive}
        >
          Register
        </button>
        {resetStatus && (
          <p className={`text-sm mt-4 ${resetStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
            {resetStatus}
          </p>
        )}
        <p
          className="text-sm text-gray-600 mt-4 underline cursor-pointer"
          onClick={handleForgotPassword}
        >
          Forgot Password? Reset it here.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
