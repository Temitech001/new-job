import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Header = () => {
  return (
    <header className="bg-white border-b-2 border-blue-500">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/path-to-your-logo.png"
              alt="Logo"
              className="h-8 w-8 mr-2"
            />
            <span className="text-black text-lg font-semibold">Your Logo</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4">
          <Link
            to="/find-job"
            className="text-black hover:text-blue-500 transition duration-300"
          >
            Find Job
          </Link>
          <Link
            to="/company"
            className="text-black hover:text-blue-500 transition duration-300"
          >
            Company Reviews
          </Link>
        </nav>

        {/* Sign In Button */}
        <div className="flex items-center space-x-2">
          <Link
            to="/signin"
            className="text-blue-500 hover:underline transition duration-300"
          >
            Sign In
          </Link>
          {/* Profile Icon (You can replace this with your own profile icon) */}
          <img
            src="/path-to-your-profile-icon.png"
            alt="Profile"
            className="h-6 w-6"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="bg-blue-500 h-1"></div>
    </header>
  );
};

export default Header;
