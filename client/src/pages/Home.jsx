import React from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Task Manager</h1>
        <p>Organize your tasks efficiently and boost your productivity</p>
        <div className="cta-buttons">
          <Link to="/login" className="cta-button login-button">
            Login
          </Link>
          <Link to="/register" className="cta-button register-button">
            Register
          </Link>
        </div>
      </div>
      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-tasks"></i>
            <h3>Task Management</h3>
            <p>Create, edit, and organize your tasks with ease.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-calendar-alt"></i>
            <h3>Due Dates</h3>
            <p>Set deadlines to stay on track with your goals.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Priority Levels</h3>
            <p>Mark tasks by priority to focus on what matters.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;