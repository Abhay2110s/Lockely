import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { useAuth, useUser } from "@clerk/react";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import { setupApiAuth } from "@/services/api";
import { syncUser } from "@/services/auth.service";

// Bridges Clerk's session token into every axios request (see
// services/api.js) and mirrors the signed-in user into the backend's
// local profile the moment a session exists.
function ClerkApiBridge() {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    setupApiAuth(getToken);
  }, [getToken]);

  useEffect(() => {
    if (!isSignedIn || !user) return;
    syncUser({
      name: user.fullName || user.firstName || "",
      email: user.primaryEmailAddress?.emailAddress || "",
    }).catch((error) => {
      console.error("Failed to sync user with backend:", error);
    });
  }, [isSignedIn, user]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <ClerkApiBridge />
        <AppRoutes />
      </MotionConfig>
    </ThemeProvider>
  );
}