import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './SignIn.css'; // Add your additional CSS file for custom styling

const SignIn = () => {
  const [email, setEmail] = useState(''); // Initialize email state

  // Function to handle changes in the email input
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state
  };

  // Function to handle the "Continue" button click
  const handleContinueClick = () => {
    // Perform any action you want when the button is clicked
    console.log('Continue button clicked with email:', email);
  };

  // Check if the button is active
  const isButtonActive = !!email;

  return (
    <div className="bg-gray-100 py-8">
         <Link to="/" className="text-xl font-semibold text-blue-600">
          <img width="200px"
            src={process.env.PUBLIC_URL+`360.png`}
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
        <p className="text-sm text-gray-400 mb-6">
          By creating an account or logging in, you understand and agree to Indeed's Terms. You also acknowledge our Cookie and Privacy policies. You will receive marketing messages from JobConnect360 and may opt out at any time by following the unsubscribe link in our messages, or as detailed in our terms.
        </p>
        <button className="bg-blue-500 text-white rounded-lg py-2 px-4 mb-4 w-full hover:bg-blue-600">
        FcGoogleContinue with Google
        </button>
        <button className="bg-black text-white rounded-lg py-2 px-4 mb-4 w-full hover:bg-gray-800">
          Continue with Apple
        </button>
        <div className="text-center text-gray-500 text-sm mb-4">OR</div>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-600">Email Address</label>
          <input
            type="email"
            id="email"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter your email"
            value={email} // Set the input value to the email state
            onChange={handleEmailChange} // Handle changes in the email input
          />
        </div>
        <button
          className={`bg-blue-500 text-white rounded-g py-2 px-4 w-full ${
            isButtonActive
              ? 'hover:bg-blue-600'
              : 'opacity-50 cursor-not-allowed filter grayscale'
          }`}
          onClick={handleContinueClick} // Handle the "Continue" button click
          disabled={!isButtonActive} // Disable the button if email is empty
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SignIn;
