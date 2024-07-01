import { connectToDatabase } from "@/db";
import { QuizI } from "@/lib/types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { quizId } = JSON.parse(req.body);

      const client = await connectToDatabase();
      const db = client.db("quixlardb");

      const quizCollection = db.collection<QuizI>("quizzes");

      const quiz = await quizCollection.findOne({ _id: new ObjectId(quizId) });
      await client.close();

      res.status(201).json({ quiz });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
