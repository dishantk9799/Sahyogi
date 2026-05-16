import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../shared/components/Loader";
import { useAuth } from "../features/auth/hooks/useAuth";

function ProtectedRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loader label="Checking session..." />;

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
