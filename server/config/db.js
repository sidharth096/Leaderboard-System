import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URL;

    const dbOptions = {
      dbName: process.env.DB_NAME
    };
    
    await mongoose.connect(dbURI, dbOptions);
    console.log("Database connected successfully...");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); 
  }
};

export default connectDB;  
