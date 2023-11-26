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
        <div>
            <Link to="/">
                Find Jobs
            </Link>
        </div>
        </div>
    </header>
  );
};

export default Header;
