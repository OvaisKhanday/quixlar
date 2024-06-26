import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  console.log(process.env.MONGODB_URI);
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  return client;
}
