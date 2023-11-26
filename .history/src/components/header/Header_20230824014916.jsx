import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { useAuth } from '../../components/server/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOutClick = async () => {
    try {
      await signOut();
      navigate('/');
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
            width="200px"
            src={process.env.PUBLIC_URL + `360.png`}
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
            to="/company"
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Company
          </Link>
        </nav>

        {/* Sign In/Out and Post a Job */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={handleSignOutClick}
                className="text-blue-600 border border-blue-600 rounded-full px-4 py-2 hover:bg-blue-600 hover:text-white transition duration-300"
              >
                <span className='flex items-center'>
                  Sign Out&nbsp;<BsFillPersonFill/>
                </span>
              </button>
              <Link
                to="/post-job"
                className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition duration-300"
              >
                Post a Job
              </Link>
            </>
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
            to="/"
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
          {user ? (
            <>
              <Link
                to="/signout"
                className="block text-blue-600 hover:underline transition duration-300 py-2"
                onClick={handleSignOutClick}
              >
                Sign Out
              </Link>
              <Link
                to="/post-job"
                className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition duration-300 my-2"
              >
                Post a Job
              </Link>
            </>
          ) : (
            <Link
              to="/signin"
              className="block text-blue-600 hover:underline transition duration-300 py-2"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
