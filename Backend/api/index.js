// Vercel serverless entry point.
// Database initialization is handled by middleware registered BEFORE the API
// routes in src/app.js. This is important because app.js already mounts the
// routes before this module is loaded.
import "../src/config/env.js";
import app from "../src/app.js";

export default app;
