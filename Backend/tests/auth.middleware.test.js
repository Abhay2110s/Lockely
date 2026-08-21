import { describe, it, expect, vi } from "vitest";
import jwt from "jsonwebtoken";
import verifyAuth from "../src/middleware/auth.middleware.js";
import env from "../src/config/env.js";

describe("Auth Middleware", () => {
  const userId = "507f1f77bcf86cd799439011";

  it("should authenticate via pg_auth httpOnly cookie", async () => {
    const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "1h" });
    const req = {
      cookies: { pg_auth: token },
      headers: {},
    };
    const res = {};
    const next = vi.fn();

    await verifyAuth(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.user).toEqual({ id: userId });
  });

  it("should authenticate via Authorization Bearer header as fallback", async () => {
    const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "1h" });
    const req = {
      cookies: {},
      headers: { authorization: `Bearer ${token}` },
    };
    const res = {};
    const next = vi.fn();

    await verifyAuth(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.user).toEqual({ id: userId });
  });

  it("should reject when no cookie or header is present", async () => {
    const req = { cookies: {}, headers: {} };
    const res = {};
    const next = vi.fn();

    await verifyAuth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeDefined();
    expect(err.statusCode).toBe(401);
    expect(err.message).toMatch(/Unauthorized/i);
  });

  it("should reject expired tokens", async () => {
    const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "-1s" });
    const req = {
      cookies: { pg_auth: token },
      headers: {},
    };
    const res = {};
    const next = vi.fn();

    await verifyAuth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeDefined();
    expect(err.statusCode).toBe(401);
    expect(err.message).toMatch(/Invalid or expired session/i);
  });

  it("should reject tokens with invalid signatures", async () => {
    const token = jwt.sign({ userId }, "wrong-secret-key-12345");
    const req = {
      cookies: { pg_auth: token },
      headers: {},
    };
    const res = {};
    const next = vi.fn();

    await verifyAuth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeDefined();
    expect(err.statusCode).toBe(401);
    expect(err.message).toMatch(/Invalid or expired session/i);
  });
});
