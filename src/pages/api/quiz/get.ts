import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase } from "@/db";
import { UserI } from "@/lib/dbHelper/models/User";
import { QuizI } from "@/pages/dashboard/quiz";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email: userEmail } = JSON.parse(req.body);

      const client = await connectToDatabase();
      const db = client.db("quixlardb");

      const userCollection = db.collection<UserI>("users");
      const quizCollection = db.collection<QuizI>("quizzes");

      const user = await userCollection.findOne({ email: userEmail });
      const quizzes: QuizI[] = [];
      for (const quiz of user?.quizzes!) {
        const newQuiz = await quizCollection.findOne({ _id: quiz });
        quizzes.push(newQuiz as QuizI);
      }
      await client.close();

      res.status(201).json({ quizzes });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
