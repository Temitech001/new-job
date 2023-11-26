import { Link } from 'react-router-dom'; // Import Link from React Router
import './Header.css'; // Create this CSS file for custom styles

const Header = () => {

  return (
    <header className="p-6">
      <div className="container mx-auto flex justify-between items-center">
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
    </header>
  );
};

export default Header;
