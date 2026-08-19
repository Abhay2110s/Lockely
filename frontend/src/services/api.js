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

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach the JWT from localStorage to every outgoing request.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("pg_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
