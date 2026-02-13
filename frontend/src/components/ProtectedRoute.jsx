import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-emerald-500">Loading...</div>;
    }

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== 'admin') {
        // Redirect to home if not an admin
        return <Navigate to="/" replace />;
    }

    // Render child routes
    return <Outlet />;
};

export default ProtectedRoute;
