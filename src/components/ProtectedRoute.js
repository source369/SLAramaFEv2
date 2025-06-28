import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
