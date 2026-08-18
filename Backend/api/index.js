// Vercel serverless entry point.
// Do not connect to MongoDB during module evaluation: a cold-start
// connection failure would crash the entire function before Express can
// return a useful response.
import "../src/config/env.js";

import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import logger from "../src/utils/logger.js";

let dbReady = false;
let dbPromise = null;

const ensureDB = async () => {
  if (dbReady) return;

  if (!dbPromise) {
    dbPromise = connectDB()
      .then(() => {
        dbReady = true;
      })
      .catch((error) => {
        dbPromise = null;
        throw error;
      });
  }

  await dbPromise;
};

// Only API routes that use MongoDB need the database connection.
app.use("/api/v1", async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (error) {
    logger.error(`Vercel database initialization failed: ${error.message}`);
    next(error);
  }
});

export default app;
