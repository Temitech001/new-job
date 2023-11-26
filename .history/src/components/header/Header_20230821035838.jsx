import React, { useState } from 'react';
import './Header.css'; // Create this CSS file for custom styles

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
        <nav className={`md:flex space-x-6 ${menuOpen ? 'hidden' : ''}`}>
          <a
            href="#"
            className="text-white hover:underline transition duration-300"
          >
            Find Job
          </a>
          <a
            href="#"
            className="text-white hover:underline transition duration-300"
          >
            Company
          </a>
        </nav>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden cursor-pointer"
          onClick={toggleMenu}
        >
          <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>

        {/* Mobile Menu Items */}
        <div className={`md:hidden ${menuOpen ? 'menu-open' : ''}`}>
          <nav className="menu-items">
            <a
              href="#"
              className="text-white hover:underline transition duration-300"
            >
              Find Job
            </a>
            <a
              href="#"
              className="text-white hover:underline transition duration-300"
            >
              Reviews
            </a>
            <a
              href="#"
              className="text-white hover:underline transition duration-300"
            >
              Help Center
            </a>
          </nav>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block h-6 w-px bg-white mx-4"></div>

        {/* Sign In and Post a Job */}
        <div className="flex items-center space-x-6">
          <a
            href="#"
            className="text-white hover:underline transition duration-300"
          >
            Sign In
          </a>
          <a
            href="#"
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
