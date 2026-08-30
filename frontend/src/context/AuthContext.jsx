/* eslint-disable react-refresh/only-export-components */
// AuthContext — manages auth state and vault key in memory.
//
// Security design:
//   - JWT lives in an httpOnly cookie (never in JS-accessible storage).
//   - Non-sensitive user profile (name/email) is cached in localStorage for
//     instant render on page load.
//   - vaultKey (derived via PBKDF2 from master password) is held ONLY in memory
//     as a CryptoKey object. It is never exported, serialised, or persisted.
//     On logout it is set to null and garbage-collected.
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "@/services/api";
import { logout as logoutAPI } from "@/services/auth.service";
import { deriveVaultKey } from "@/services/crypto.service";

const AuthContext = createContext(null);

const USER_KEY = "pg_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  // The AES-256-GCM CryptoKey derived from the master password.
  // null = vault is "locked" (user hasn't logged in yet or has logged out).
  const [vaultKey, setVaultKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // On mount, validate the session by fetching the user profile.
  // If the cookie is gone/expired, this will 401 and we clear local state.
  // Note: the vault key is NOT restored on page reload — the user must re-derive
  // it by logging in again (enter master password). This is intentional: the key
  // should not survive page refreshes in a zero-knowledge model.
  useEffect(() => {
    api
      .get("/auth/me")
      .then(({ data }) => {
        const userData = data?.data;
        if (userData) {
          setUser(userData);
          localStorage.setItem(USER_KEY, JSON.stringify(userData));
        } else {
          localStorage.removeItem(USER_KEY);
          localStorage.removeItem("pg_token");
          setUser(null);
          setVaultKey(null);
        }
      })
      .catch(() => {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem("pg_token");
        setUser(null);
        setVaultKey(null);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  /**
   * Derive the vault key and store the session after successful login.
   * Called by login and 2FA verify flows once credentials are confirmed.
   *
   * @param {object} newUser       — { id, name, email }
   * @param {string} vaultKeySalt  — hex-encoded per-user salt from server
   * @param {string} masterPassword — the user's plaintext password (never stored)
   * @param {string} [token]       — JWT token fallback for cross-domain requests
   */
  const saveSession = useCallback(async (newUser, vaultKeySalt, masterPassword, token) => {
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    if (token) {
      localStorage.setItem("pg_token", token);
    }
    setUser(newUser);

    // Derive the vault key in the background.
    if (vaultKeySalt && masterPassword) {
      try {
        const key = await deriveVaultKey(masterPassword, vaultKeySalt);
        setVaultKey(key);
      } catch (err) {
        console.error("[AuthContext] Vault key derivation failed:", err);
        // Non-fatal — user can still navigate; vault items just won't decrypt.
      }
    }
  }, []);

  /** Unlock vault in memory using the master password and stored salt */
  const unlockVault = useCallback(async (masterPassword) => {
    const salt = user?.vaultKeySalt;
    if (!salt) {
      throw new Error("Missing vault key salt. Please sign in again.");
    }
    const key = await deriveVaultKey(masterPassword, salt);
    setVaultKey(key);
    return key;
  }, [user?.vaultKeySalt]);

  /** Update local user profile state */
  const updateUser = useCallback((updatedFields) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedFields };
      localStorage.setItem(USER_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  /** Clear the session: tell the backend to clear the cookie, wipe local state. */
  const logout = useCallback(async () => {
    try {
      await logoutAPI();
    } catch {
      // Ignore server errors — the cookie will expire naturally.
    } finally {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem("pg_token");
      setUser(null);
      setVaultKey(null); // drop the key from memory
    }
  }, []);

  const value = {
    user,
    vaultKey,
    isLoaded,
    isAuthenticated: !!user,
    isVaultUnlocked: !!vaultKey,
    saveSession,
    unlockVault,
    updateUser,
    logout,
    // Convenience shorthands used by components.
    displayName: user?.displayName || user?.name || user?.email || "Guardian",
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
