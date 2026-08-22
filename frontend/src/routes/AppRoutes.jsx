import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts — kept eager, they're tiny shells needed on every route.
import LandingLayout from "@/layouts/LandingLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import PageLoader from "@/components/common/PageLoader";

// Landing is the public entry point (/) — keep it in the main bundle so
// there's no extra network round-trip / loading flash on first paint.
import Landing from "@/pages/Landing";

// Everything else is code-split: each page (and the vendor code only it
// needs) loads on demand instead of shipping on every visit, including
// anonymous visits to "/". This is the single biggest win for the
// landing-page Lighthouse score, since Dashboard/Vault/Settings pull in
// heavy chart/animation code that a first-time visitor never touches.
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const VerifyOTP = lazy(() => import("@/pages/VerifyOTP"));
const TwoFactorChallenge = lazy(() => import("@/pages/TwoFactorChallenge"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Vault = lazy(() => import("@/pages/Vault"));
const PasswordGenerator = lazy(() => import("@/pages/PasswordGenerator"));
const Profile = lazy(() => import("@/pages/Profile"));
const Settings = lazy(() => import("@/pages/Settings"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
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

      {/* 2FA challenge step — intermediate auth step (not fully public or protected) */}
      <Route path="/verify-2fa" element={<TwoFactorChallenge />} />

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
    </Suspense>
  );
}