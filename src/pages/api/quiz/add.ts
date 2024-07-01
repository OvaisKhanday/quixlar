import { connectToDatabase } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { QuizI, UserI } from "@/lib/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).json({ message: "Unauthorized user" });

      const client = await connectToDatabase();
      const db = client.db("quixlardb");

      const quiz: QuizI = req.body;

      const userCollection = db.collection<UserI>("users");
      const quizCollection = db.collection<QuizI>("quizzes");

      const result = await quizCollection.insertOne(quiz);

      await userCollection.findOneAndUpdate({ email: session?.user?.email! }, { $push: { quizzes: result.insertedId as unknown as ObjectId } });

      res.status(201).json({ message: "Quiz created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
