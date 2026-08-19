import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_BASE_URL?.trim();

const API_BASE_URL =
  configuredApiUrl ||
  (window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api/v1"
    : "https://pass-gaurdian.vercel.app/api/v1");

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
