import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { useAuth } from '../../components/server/AuthContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = ({}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOutClick = async () => {
    try {
      await signOut();
      navigate('/'); // Redirect to the homepage after sign-out using navigate
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-blue-600">
          <img
            width="250px"
            src={logoUrl}
            alt="Logo"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Find Job
          </Link>
          <Link
            to="/support"
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Support
          </Link>
        </nav>

        {/* Sign In/Out and Post a Job (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleSignOutClick}
              className="text-blue-600 border border-blue-600 rounded-full px-4 py-2 hover:bg-blue-600 hover:text-white transition duration-300"
            >
              <span className='flex items-center'>
                Sign Out&nbsp;<BsFillPersonFill/>
              </span>
            </button>
          ) : (
            <Link
              to="/signin"
              className="text-blue-600 border border-blue-600 rounded-full px-4 py-2 hover:bg-blue-600 hover:text-white transition duration-300"
            >
              <span className='flex items-center'>
                Sign In&nbsp;<BsFillPersonFill/>
              </span>
            </Link>
          )}
          <Link
            to={user ? "/post-job" : "/signin"} // Disable the link when the user is not signed in
            className={`${
              user
                ? "bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition duration-300"
                : "bg-gray-300 text-gray-600 rounded-full px-4 py-2 cursor-not-allowed"
            }`}
          >
            Post a Job
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button
            className="md:hidden block text-2xl text-gray-600 hover:text-blue-600 transition duration-300"
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
            to="/"
            className="block text-gray-600 hover:text-blue-600 transition duration-300 py-2"
          >
            Find Job
          </Link>
          <Link
            to="/support"
            className="block text-gray-600 hover:text-blue-600 transition duration-300 py-2"
          >
            Support
          </Link>
          <hr className="my-3" />
          {user ? (
            <button
              onClick={handleSignOutClick} // Call the same function as the desktop "Sign Out" button
              className="block text-blue-600 hover:underline transition duration-300 py-2 mx-auto"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/signin"
              className="block text-blue-600 hover:underline transition duration-300 py-2"
            >
              Sign In
            </Link>
          )}
          <Link
            to={user ? "/post-job" : "/signin"} // Disable the link when the user is not signed in
            className={`${
              user
                ? "bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition duration-300 my-2"
                : "bg-gray-300 text-gray-600 rounded-full px-4 py-2 cursor-not-allowed my-2"
            }`}
          >
            Post a Job
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
