// src/components/auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../ui/loader';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isGuest } = useAuth();
  console.log('ProtectedRoute check:', { user, isGuest });

  if (loading) {
    return <Loader />;
  }

  if (!user && !isGuest) {
    console.log('Redirecting to login from ProtectedRoute');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;