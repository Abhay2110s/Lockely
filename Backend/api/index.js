// Serverless entry point (Vercel). Loads env before app.js is evaluated,
// connects to the database, and exports the Express app for the serverless runtime.
import "../src/config/env.js";

import app from "../src/app.js";
import connectDB from "../src/config/db.js";

await connectDB();

export default app;
