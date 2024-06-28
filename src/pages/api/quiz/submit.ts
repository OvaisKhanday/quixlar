import { QuestionType } from "@/components/QuestionPage";
import { Answers } from "@/components/QuizQuestionExam";
import { connectToDatabase } from "@/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Participant, QuizI } from "../../dashboard/quiz";

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

function getScore(correct: boolean[], userInput: boolean[]) {
  const totalCorrect = correct.filter((b) => b).length;
  let totalUserCorrect = 0;
  for (let i = 0; i < Math.min(correct.length, userInput.length); i++) {
    if (correct[i] && correct[i] === userInput[i]) totalUserCorrect++;
  }
  return totalUserCorrect / totalCorrect;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const client = await connectToDatabase();
      const db = client.db("quixlardb");

      const { name, answers, quizId }: { name: string; answers: Answers; quizId: string } = JSON.parse(req.body);

      const quizCollection = db.collection<QuizI>("quizzes");
      const quiz = await quizCollection.findOne({ _id: new ObjectId(quizId) });
      console.log(quiz);

      const totalCorrectAnswers = getTotalCorrectAnswers(quiz?.questions!, answers);
      console.log(totalCorrectAnswers);

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
