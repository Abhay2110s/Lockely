import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(".env"),
});

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    
  try {
    console.log(process.env.MONGODB_URI);
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

startServer();