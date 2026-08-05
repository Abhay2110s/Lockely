import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }
    const db = await mongoose.connect(
      process.env.MONGODB_URI
    );

    isConnected = db.connection.readyState === 1;

    console.log("=================================");
    console.log("✅ MongoDB Connected");
    console.log(`📦 Database: ${db.connection.name}`);
    console.log("=================================");


  } catch (error) {

    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    throw error;
  }
};


export default connectDB;