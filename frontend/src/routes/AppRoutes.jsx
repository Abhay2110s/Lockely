import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import LandingLayout from "@/layouts/LandingLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import VerifyOTP from "@/pages/VerifyOTP";
import Dashboard from "@/pages/Dashboard";
import Vault from "@/pages/Vault";
import PasswordGenerator from "@/pages/PasswordGenerator";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Route>

      {/* Legacy /sign-in and /sign-up routes — redirect to new paths */}
      <Route path="/sign-in" element={<Navigate to="/login" replace />} />
      <Route path="/sign-in/*" element={<Navigate to="/login" replace />} />
      <Route path="/sign-up" element={<Navigate to="/register" replace />} />
      <Route path="/sign-up/*" element={<Navigate to="/register" replace />} />

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Error Pages */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}