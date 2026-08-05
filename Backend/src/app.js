import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";

const app = express();
// Security Middleware
app.use(helmet());


// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


// Request Logger
if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

// Body Parser
app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Cookie Parser
app.use(cookieParser());

// Compression
app.use(compression());

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PassGuardian API is running 🚀",
  });
});



// API Routes
app.use("/api/v1/auth",authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Something went wrong.",
  });

});



export default app;