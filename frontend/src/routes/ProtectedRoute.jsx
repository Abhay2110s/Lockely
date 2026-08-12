import { useAuth } from "@clerk/react";
import { Navigate, Outlet } from "react-router-dom";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center gap-4">
        <div className="size-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 animate-pulse">
          <ShieldCheck className="size-6" />
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
          <Loader2 className="size-4 animate-spin text-indigo-600" />
          Verifying security session...
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children ? children : <Outlet />;
}
