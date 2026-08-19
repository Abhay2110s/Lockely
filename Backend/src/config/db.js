import mongoose from "mongoose";
import env from "./env.js";
import logger from "../utils/logger.js";

let connectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  })
    .then((connection) => {
      logger.info(`MongoDB connected — database: ${connection.connection.name}`);
      return connection.connection;
    })
    .catch((error) => {
      connectionPromise = null;
      logger.error(`MongoDB connection failed: ${error.message}`);
      throw error;
    });

  return connectionPromise;
};

export default connectDB;
