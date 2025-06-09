import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/authService';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [auth, setAuth] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      const result = await isAuthenticated();
      setAuth(result);
    })();
  }, []);

  if (auth === null) {
    return <div className="flex justify-center items-center h-screen">Checking authentication...</div>;
  }
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute; 