// src/components/ui/Navbar.jsx
import { Link } from 'react-router-dom';
import Button from './button';
import '../../css/components/navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            Task Manager
          </Link>
          <div className="navbar-items">
            <span className="navbar-email">{user?.email}</span>
            <Button onClick={onLogout} size="sm" variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;