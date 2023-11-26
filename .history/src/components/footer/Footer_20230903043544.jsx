import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the location icon

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="copyright">© 2023 Your Company Name</div>
        <div className="location">
          <FaMapMarkerAlt className="location-icon" />
          <address>123 Main Street, City, Country</address>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
