// Load & validate environment variables FIRST, before anything else in the
// import graph reads process.env at module-evaluation time. (Previously
// dotenv.config() ran after app.js had already read process.env.CLIENT_URL
// for the CORS setup, which silently broke local `npm run dev`.)
import "./config/env.js";

import env from "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

// Asynchronously start the server: connect to MongoDB, then listen on the
// configured port. Exit with a non-zero code if anything fails at startup.
const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
