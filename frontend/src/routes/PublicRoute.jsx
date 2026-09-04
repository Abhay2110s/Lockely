import { useAppAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import PageLoader from "@/components/common/PageLoader";

export default function PublicRoute({ children, redirectIfAuthenticated = false }) {
  const { isLoaded, isAuthenticated } = useAppAuth();

  if (!isLoaded) {
    return <PageLoader message="Loading Lockely..." />;
  }

  if (isAuthenticated && redirectIfAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
}
