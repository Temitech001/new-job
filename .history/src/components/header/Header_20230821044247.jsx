import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
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
          <Link to="/" className="flex items-center">
            <img
              src={process.env.PUBLIC_URL+`360.png`}
              alt="Logo"
              className="mr-2"
            />
            <span className="text-white text-lg font-semibold">Your Logo</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav
          className={`md:flex space-x-6 ${
            menuOpen ? 'hidden md:block' : 'md:hidden'
          }`}
        >
          <Link
            to="/find-job"
            className="text-white hover:underline transition duration-300"
          >
            Find Job
          </Link>
          <Link
            to="/company"
            className="text-white hover:underline transition duration-300"
          >
            Company
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {menuOpen && (
          <div className="md:hidden">
            <nav className="menu-items">
              <Link
                to="/find-job"
                className="text-white hover:underline transition duration-300"
              >
                Find Job
              </Link>
              <Link
                to="/reviews"
                className="text-white hover:underline transition duration-300"
              >
                Reviews
              </Link>
              <Link
                to="/help-center"
                className="text-white hover:underline transition duration-300"
              >
                Help Center
              </Link>
            </nav>
          </div>
        )}

        {/* Vertical Divider */}
        <div className="hidden md:block h-6 w-px bg-white mx-4"></div>

        {/* Sign In and Post a Job */}
        <div className="flex items-center space-x-6">
          <Link
            to="/signin"
            className="text-white hover:underline transition duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/post-job"
            className="text-white hover:underline transition duration-300"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
