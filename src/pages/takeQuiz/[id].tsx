import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { QuizI } from "../dashboard/quiz";
import AskForUserNameDialog from "@/components/AskForUserNameDialog";
import { useState } from "react";

interface TakeQuiz {
  quiz: QuizI;
}
export default function TakeQuiz({ quiz }: TakeQuiz) {
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(true);
  // ask for name - via a dialog
  // generate a token for user
  // start quiz
  // submit button
  // save the answer of each question to the db along with name and token
  // display the results
  // check if the user with same token is making another submit - idempotent

  function nameHandler(name: string) {
    setIsNameDialogOpen(false);
  }
  return (
    <div>
      <AskForUserNameDialog isOpen={isNameDialogOpen} onName={nameHandler} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const quizId = context.params.id;
  async function getQuiz(quizId: string): Promise<QuizI | null> {
    try {
      const session = await getServerSession(context.req, context.res, authOptions);
      if (!session) throw new Error("user not found");

      const resp = await fetch("http://localhost:3000/api/quiz/getQuiz", {
        method: "POST",
        body: JSON.stringify({ quizId }),
      });
      const body = await resp.json();
      return body.quiz;
    } catch (error) {
      return null;
    }
  }

  const quiz = await getQuiz(quizId);

  return {
    props: {
      quiz,
    },
  };
}
