import mongoose from "mongoose";
import { env, isTest } from "./env.js";
export async function connectDatabase(uri = env.MONGO_URI) {
  mongoose.set("strictQuery", true);
  const connection = await mongoose.connect(uri, {
    autoIndex: !isTest,
  });
  return connection;
}
export async function disconnectDatabase() {
  await mongoose.connection.close();
}
