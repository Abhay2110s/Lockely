import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * Setup authorization header using Clerk JWT token
 * @param {Function} getToken - Clerk's getToken function from useAuth()
 */
let authInterceptorAttached = false;

/**
 * Setup authorization header using Clerk JWT token.
 * Safe to call more than once (e.g. React StrictMode double-invoking
 * effects in dev) — only attaches the interceptor once.
 * @param {Function} getToken - Clerk's getToken function from useAuth()
 */
export const setupApiAuth = (getToken) => {
  if (authInterceptorAttached) return;
  authInterceptorAttached = true;

  api.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Failed to attach Clerk token to API request:", error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default api;
