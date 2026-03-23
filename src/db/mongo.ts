import mongoose from "mongoose";
import { env } from "../config/env";

let isConnected = false;

export async function connectToMongo() {
   if (isConnected) {
      return;
   }

   if (!env.mongoDbUri) {
      throw new Error("MONGODB_URI is not set");
   }

   await mongoose.connect(env.mongoDbUri, {
      dbName: env.mongoDbName,
   });

   isConnected = true;

   console.log(`MongoDB connected to database: ${env.mongoDbName}`);
}
