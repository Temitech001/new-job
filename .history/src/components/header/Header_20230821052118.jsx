import { Link } from 'react-router-dom'; // Import Link from React Router
import './Header.css'; // Create this CSS file for custom styles

const Header = () => {

  return (
    <header className="">
      <div className="container">
        <div className="flex items-center">
          <Link to="/" className="px-">
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
