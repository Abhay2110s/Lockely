// AuthContext — manages JWT-based auth state in memory + localStorage.
// Provides login, logout, register, and the current user to the whole app.
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "@/services/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "pg_token";
const USER_KEY = "pg_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // On mount, validate the stored token by fetching the user profile.
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setIsLoaded(true);
      return;
    }

    api.get("/auth/me", {
      headers: { Authorization: `Bearer ${stored}` },
    })
      .then(({ data }) => {
        const userData = data.data;
        setUser(userData);
        setToken(stored);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
      })
      .catch(() => {
        // Token is invalid/expired — clear storage.
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  /**
   * Store token + user after a successful login or OTP verification.
   * @param {string} newToken - JWT returned from the backend
   * @param {object} newUser  - { id, name, email }
   */
  const saveSession = useCallback((newToken, newUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  /** Clear everything and sign the user out. */
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    token,
    user,
    isLoaded,
    isAuthenticated: !!token && !!user,
    saveSession,
    logout,
    // Convenience shorthands used by components.
    displayName: user?.name || user?.email || "Guardian",
    initials:
      user?.name?.[0]?.toUpperCase() ||
      user?.email?.[0]?.toUpperCase() ||
      "G",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** useAppAuth — consume auth state anywhere in the component tree. */
export function useAppAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAppAuth must be used inside <AuthProvider>");
  return ctx;
}

export default AuthContext;
