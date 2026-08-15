import { createContext, useContext } from "react";
import { useUser, useAuth, useClerk } from "@clerk/react";

/**
 * AuthContext wraps Clerk's hooks into a single consistent interface.
 * It is already provided at the app level via Clerk's <ClerkProvider>.
 * This context just makes it more ergonomic to consume.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // All state comes from Clerk — no duplicate state needed.
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

/**
 * useAppAuth — unified auth hook combining Clerk primitives.
 * Returns the authenticated user, loading state, sign-out helper, etc.
 */
export function useAppAuth() {
  const { user, isLoaded: userLoaded } = useUser();
  const { isSignedIn, isLoaded: authLoaded, userId, getToken } = useAuth();
  const { signOut } = useClerk();

  return {
    user,
    userId,
    isSignedIn,
    isLoaded: userLoaded && authLoaded,
    getToken,
    signOut: () => signOut({ redirectUrl: "/" }),
    // Convenience shorthand
    displayName: user?.fullName || user?.primaryEmailAddress?.emailAddress || "Guardian",
    initials: user?.firstName?.[0]?.toUpperCase() || user?.primaryEmailAddress?.emailAddress?.[0]?.toUpperCase() || "G",
    avatarUrl: user?.imageUrl,
  };
}

export default AuthContext;
