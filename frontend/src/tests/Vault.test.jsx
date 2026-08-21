import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import Vault from "../pages/Vault";
import { AuthProvider } from "../context/AuthContext";
import * as passwordService from "../services/password.service";

vi.mock("../services/password.service", () => ({
  getPasswords: vi.fn(),
  createPassword: vi.fn(),
  softDeletePassword: vi.fn(),
}));

vi.mock("../services/api", () => ({
  default: {
    get: vi.fn().mockRejectedValue(new Error("No cookie session")),
    post: vi.fn(),
  },
}));

describe("Vault Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the vault heading and search bar", async () => {
    passwordService.getPasswords.mockResolvedValue({
      data: { entries: [], total: 0 },
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Vault />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Encrypted Password Vault")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search credentials...")).toBeInTheDocument();
    expect(screen.getByText("Add New Vault Item")).toBeInTheDocument();
  });

  it("renders vault entries when loaded", async () => {
    passwordService.getPasswords.mockResolvedValue({
      data: {
        entries: [
          {
            id: "entry-1",
            title: "GitHub Credentials",
            username: "octocat",
            website: "github.com",
            cipherText: "dGVzdA==",
            iv: "MTIzNDU2Nzg5MDEy",
            authTag: "YXV0aFRhZw==",
            category: "Work",
          },
        ],
        total: 1,
      },
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Vault />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("GitHub Credentials")).toBeInTheDocument();
    });

    expect(screen.getByText("octocat")).toBeInTheDocument();
  });
});
