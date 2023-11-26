import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the location icon

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-gray-800 text-white py-4 fixed bottom-0 w-full left-0">
      <div className="container mx-auto">
        <div className="md:flex md:justify-between md:items-center">
          <div className="md:flex-shrink-0">
            <div className="copyright mb-2 md:mb-0">&copy; {currentYear} Your Company Name</div>
          </div>
          <div className="md:flex md:items-center">
            <div className="location md:flex md:items-center">
              <FaMapMarkerAlt className="location-icon mr-2" />
              <address>123 Main Street, City, Country</address>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
