import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the location icon

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-grow-0">
          <div className="copyright">&copy; {currentYear} Your Company Name</div>
        </div>
        <div className="flex-grow flex justify-end items-center">
          <div className="location flex items-center">
            <FaMapMarkerAlt className="location-icon mr-2" />
            <address>123 Main Street, City, Country</address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
