// Mongoose database connection module — exports a singleton connectDB
// function that avoids creating duplicate connections.
import mongoose from "mongoose";
import env from "./env.js";
import logger from "../utils/logger.js";

// Track connection state so we can reuse an existing connection on
// repeated calls (e.g. during serverless cold starts or module re-evaluation).
let isConnected = false;

const connectDB = async () => {
  // Return early if already connected to MongoDB.
  if (isConnected) {
    logger.info("Using existing MongoDB connection");
    return;
  }
  try {
    const db = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = db.connection.readyState === 1;

    logger.info(`MongoDB connected — database: ${db.connection.name}`);
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};


export default connectDB;