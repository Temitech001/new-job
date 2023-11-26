import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Header.css'; // Create this CSS file for custom styles
import {BsFillPersonFill} from 'react-icons/bs'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-blue-600">
          <img width="200px"
            src={process.env.PUBLIC_URL+`360.png`}
            alt="Logo"
            // className="h-8 w-8 inline-block mr-2"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/find-job"
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Find Job
          </Link>
          <Link
            to="/company"
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Company
          </Link>
        </nav>

        {/* Sign In and Post a Job (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/signin"
            className="text-blue-600 border border-blue-600 rounded-full px-4 py-2 hover:bg-blue-600 hover:text-white transition duration-300"
          >
            <span className='flex items-center'>Sign In&nbsp;<BsFillPersonFill/></span>
          </Link>
          <Link
            to="/post-job"
            className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition duration-300"
          >
            Post a Job
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button
            className="md:hidden block text-gray-600 hover:text-blue-600 transition duration-300"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {mobileMenuOpen && (
        <div className="md:hidden text-center">
          <hr className="my-3" />
          <Link
            to="/find-job"
            className="block text-gray-600 hover:text-blue-600 transition duration-300 py-2"
          >
            Find Job
          </Link>
          <Link
            to="/company"
            className="block text-gray-600 hover:text-blue-600 transition duration-300 py-2"
          >
            Company
          </Link>
          <hr className="my-3" />
          <Link
            to="/signin"
            className="block text-blue-600 hover:underline transition duration-300 py-2"
          >
            Sign In
          </Link>
          <Link
            to="/post-job"
            className="block bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition duration-300 my-2"
          >
            Post a Job
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
