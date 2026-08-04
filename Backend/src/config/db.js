import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = db.connections[0].readyState === 1;

    console.log("=================================");
    console.log("✅ MongoDB Connected");
    console.log(`📦 Database: ${db.connection.name}`);
    console.log("=================================");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    throw error;
  }
};

export default connectDB;