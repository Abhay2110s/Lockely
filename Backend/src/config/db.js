// Mongoose database connection module — exports a singleton connectDB
// function that avoids creating duplicate connections.
import dns from "node:dns";
import mongoose from "mongoose";
import env from "./env.js";
import logger from "../utils/logger.js";

// mongodb+srv:// URIs require a DNS SRV record lookup before the actual
// connection. Some ISPs/routers/VPNs — common on hostel, college, and
// corporate networks — don't resolve SRV records at all and fail the
// lookup outright (querySrv ECONNREFUSED), even though normal internet
// access works fine. Pointing Node's resolver at public DNS servers that
// do support SRV queries sidesteps that without requiring any OS-level
// network configuration change on the machine running this server.
dns.setServers(["8.8.8.8", "1.1.1.1", ...dns.getServers()]);

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