import { connectToDatabase } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const client = await connectToDatabase();
      const db = client.db("quixlardb");

      const { title, description } = req.body;

      const userCollection = db.collection("users");
      const quizCollection = db.collection("quizzes");
      const result = await quizCollection.insertOne({ title, description });
      //TODO: if quiz id already present (idempotency)
      await userCollection.findOneAndUpdate({ email: "ovaiskhanday927@gmail.com" }, { $push: { quizzes: result.insertedId } });

      res.status(200).json({ message: "Data added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
