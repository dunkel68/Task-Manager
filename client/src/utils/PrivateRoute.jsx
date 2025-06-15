import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, authChecked } = useAuth();

  if (!authChecked) {
    return <div>Verifying authentication...</div>;
  }

  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;