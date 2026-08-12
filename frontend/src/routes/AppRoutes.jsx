import { Routes, Route } from "react-router-dom";

// Layouts
import LandingLayout from "@/layouts/LandingLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Pages
import Landing from "@/pages/Landing";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import Dashboard from "@/pages/Dashboard";
import Vault from "@/pages/Vault";
import PasswordGenerator from "@/pages/PasswordGenerator";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Pages */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>

      {/* Authentication Pages (Wrapped in AuthLayout & PublicRoute) */}
      <Route
        element={
          <PublicRoute redirectIfAuthenticated={true}>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Route>

      {/* Protected Dashboard & Vault Application Pages */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/generator" element={<PasswordGenerator />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}