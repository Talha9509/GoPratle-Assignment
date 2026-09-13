import mongoose from 'mongoose'

export default async function connectDB() {
  try {
    const MONGODB_URL = process.env.MONGO_URI
    const conn = await mongoose.connect(MONGODB_URL!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1); 
  }
};
