import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Header.css'; // Create this CSS file for custom styles

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-blue-500 p-4 flex">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img width="200px"
              src={process.env.PUBLIC_URL+`360.png`}
              alt="Logo"
              className="mr-2"
            />
          </Link>
        </div>

       

        
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
