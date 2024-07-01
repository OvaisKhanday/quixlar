import { connectToDatabase } from "@/db";
import { Answers, Participant, QuestionType, QuizI } from "@/lib/types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

function getTotalCorrectAnswers(questions: QuestionType[], answers: Answers): number {
  let totalCorrect = 0;
  for (const q of questions) {
    const userAnswer = answers[q.id];
    if (userAnswer) {
      if (q.type === "mcq") {
        totalCorrect += getScore(q.correct, userAnswer as boolean[]);
      } else if (q.type === "descriptive" && (userAnswer as string).trim().toLowerCase() === q.correct.trim().toLowerCase()) totalCorrect++;
    }
  }
  return totalCorrect;
}

function getScore(correct: boolean[], userInput: boolean[]): number {
  for (let i = 0; i < Math.min(correct.length, userInput.length); i++) {
    if (correct[i] != userInput[i]) return 0;
  }
  return 1;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const client = await connectToDatabase();
      const db = client.db("quixlardb");

      const { name, answers, quizId }: { name: string; answers: Answers; quizId: string } = JSON.parse(req.body);

      const quizCollection = db.collection<QuizI>("quizzes");
      const quiz = await quizCollection.findOne({ _id: new ObjectId(quizId) });

      if (!quiz) {
        client.close();
        return res.status(404).json({ message: "quiz not found" });
      }
      const totalCorrectAnswers = getTotalCorrectAnswers(quiz?.questions!, answers);

      const newParticipant: Participant = {
        name,
        answers,
        totalCorrect: totalCorrectAnswers,
        timestamp: new Date(),
      };

      await quizCollection.findOneAndUpdate({ _id: new ObjectId(quiz?._id) }, { $push: { participants: newParticipant } });
      await client.close();

      res.status(201).json({ totalQuestion: quiz?.questions.length, totalCorrect: totalCorrectAnswers });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
