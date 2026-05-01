import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!currentUser) {
    // Redirect to login page but save the location they were trying to go to
    return <Navigate to="/login" state={{ from: location, message: "Please login to access this feature." }} replace />;
  }

  return children;
};

export default ProtectedRoute;
