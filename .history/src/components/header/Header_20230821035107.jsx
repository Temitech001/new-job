import React from 'react';
import './Header.css'; // Create this CSS file for custom styles

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/path-to-your-logo.png"
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="text-white text-lg font-semibold">Your Logo</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a
            href="/"
            className="text-white hover:underline transition duration-300"
          >
            Find Job
          </a>
          <a
            href="/"
            className="text-white hover:underline transition duration-300"
          >
            Company
          </a>
        </nav>

        {/* Vertical Divider */}
        <div className="hidden md:block h-6 w-px bg-white mx-4"></div>

        {/* Sign In and Post a Job */}
        <div className="flex items-center space-x-6">
          <a
            href="/"
            className="text-white hover:underline transition duration-300"
          >
            Sign In
          </a>
          <a
            href=""
            className="text-white hover:underline transition duration-300"
          >
            Post a Job
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
