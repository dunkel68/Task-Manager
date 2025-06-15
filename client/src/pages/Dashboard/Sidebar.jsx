import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/pages/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="dashboard-sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-tasks"></i> My Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/completed" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-check-circle"></i> Completed
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/pending" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-clock"></i> Pending
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;