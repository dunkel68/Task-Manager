import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../css/pages/Header.css';

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>Task Manager</h1>
        <div className="user-info">
          <span>{currentUser?.email}</span>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;