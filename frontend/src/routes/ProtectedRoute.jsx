import { useAppAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import PageLoader from "@/components/common/PageLoader";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isAuthenticated } = useAppAuth();

  if (!isLoaded) {
    return <PageLoader message="Verifying security session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
