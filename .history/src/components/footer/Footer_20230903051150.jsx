import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the location icon

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-gray-800 text-white py-4  bottom-0 w-full mt-10 text-center">
      <div className="container mx-auto block md:flex justify-between items-center">
        <div className="md:flex-grow-0">
          <div className="copyright">&copy; {currentYear} Your Company Name</div>
        </div>
        <div className="md:flex-grow flex justify-center md:justify-end items-center mx-auto">
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
