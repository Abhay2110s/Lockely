// Re-export the configured Axios instance for components that prefer
// importing from @/lib/axios instead of @/services/api.
// Both paths refer to the same singleton — no dual instances.
export { api as default, api } from "@/services/api";
