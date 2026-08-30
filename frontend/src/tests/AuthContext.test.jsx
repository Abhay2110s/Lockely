import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAppAuth } from "../context/AuthContext";
import api from "../services/api";

vi.mock("../services/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock("../services/auth.service", () => ({
  logout: vi.fn().mockResolvedValue({}),
}));

function Consumer() {
  const { user, isVaultUnlocked, isAuthenticated, isLoaded, saveSession, logout } = useAppAuth();
  return (
    <div>
      <span data-testid="is-loaded">{isLoaded ? "yes" : "no"}</span>
      <span data-testid="auth-status">{isAuthenticated ? "logged-in" : "logged-out"}</span>
      <span data-testid="vault-status">{isVaultUnlocked ? "unlocked" : "locked"}</span>
      <span data-testid="user-email">{user?.email || "none"}</span>
      <button
        onClick={() =>
          saveSession(
            { id: "123", email: "test@example.com", name: "Test User" },
            "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90",
            "MasterPass123!"
          )
        }
      >
        Sign In
      </button>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    api.get.mockRejectedValue(new Error("No cookie session"));
  });

  it("renders with logged-out state initially when no stored user", async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("is-loaded").textContent).toBe("yes");
    });

    expect(screen.getByTestId("auth-status").textContent).toBe("logged-out");
    expect(screen.getByTestId("vault-status").textContent).toBe("locked");
  });

  it("handles saveSession and derives vault key into memory", async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("is-loaded").textContent).toBe("yes");
    });

    await act(async () => {
      screen.getByText("Sign In").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("logged-in");
    });

    expect(screen.getByTestId("user-email").textContent).toBe("test@example.com");

    await waitFor(() => {
      expect(screen.getByTestId("vault-status").textContent).toBe("unlocked");
    });
  });

  it("clears user state and drops vault key on logout", async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("is-loaded").textContent).toBe("yes");
    });

    await act(async () => {
      screen.getByText("Sign In").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("vault-status").textContent).toBe("unlocked");
    });

    await act(async () => {
      screen.getByText("Log Out").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("logged-out");
    });

    expect(screen.getByTestId("vault-status").textContent).toBe("locked");
    expect(localStorage.getItem("pg_user")).toBeNull();
  });
});
