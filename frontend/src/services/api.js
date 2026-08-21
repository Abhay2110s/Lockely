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

// Dual-transport auth client:
// 1. `withCredentials: true` sends the pg_auth httpOnly cookie automatically for same-domain or permissive browsers.
// 2. Request interceptor attaches `Authorization: Bearer <token>` when cross-origin third-party cookie blocking is active.
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("pg_token");
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Ignore localStorage access errors (e.g. private browsing)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
