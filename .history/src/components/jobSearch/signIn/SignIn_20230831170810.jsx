import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../server/firebase'; // Adjust the path as needed

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in with email and password.');
      navigate('/');
    } catch (error) {
      console.error('Email/Password Sign-in error:', error.message);
    }
  };

  const isButtonActive = !!email && !!password;

  return (
    <div className="bg-gray-100 py-8">
      {/* ... (your existing JSX code) */}
      <div className="mb-4">
        <label htmlFor="password" className="text-gray-600">Password</label>
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
          isButtonActive
            ? 'hover:bg-blue-600'
            : 'opacity-50 cursor-not-allowed filter grayscale'
        }`}
        onClick={handleSignIn}
        disabled={!isButtonActive}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
