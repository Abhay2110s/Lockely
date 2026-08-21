import axios from "axios";

// In local development, use the local backend.
// In production, Vercel MUST provide VITE_API_BASE_URL.
const isProduction = import.meta.env.PROD;
const configuredApiUrl = import.meta.env.VITE_API_BASE_URL?.trim();

if (isProduction && !configuredApiUrl) {
  throw new Error(
    "VITE_API_BASE_URL is not configured. Set it in the Vercel frontend project and redeploy."
  );
}

const API_BASE_URL = configuredApiUrl || "http://localhost:3000/api/v1";

// The auth JWT is stored in an httpOnly cookie set by the backend.
// `withCredentials: true` ensures cookies are sent on every cross-origin
// request — this is all that's needed; no manual token attachment is required.
// NEVER store the JWT in localStorage; that makes it readable to injected scripts.
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // sends the pg_auth httpOnly cookie automatically
});

export default api;
