import mongoose from "mongoose";
import { DB_NAME } from "../constants";
import "dotenv/config";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/?appName=${DB_NAME}`
    );
    console.log(
      `\n MongoDb Connected ! DB host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Error", error);
    process.exit(1);
  }
};

export default connectDb;
