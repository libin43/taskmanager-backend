import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config() // Load environment variables from .env

const MONGO_URI = process.env.MONGO_URI as string

const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file")
    }

    const conn = await mongoose.connect(MONGO_URI)

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${(error as Error).message}`)
    process.exit(1)
  }
};

export default connectDB
