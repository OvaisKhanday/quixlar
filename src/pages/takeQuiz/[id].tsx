import AskForUserNameDialog from "@/components/AskForUserNameDialog";
import QuizQuestionExam from "@/components/QuizQuestionExam";
import { QuizI } from "@/lib/types";
import Head from "next/head";
import { useState } from "react";

interface TakeQuiz {
  quiz: QuizI;
}
export default function TakeQuiz({ quiz }: TakeQuiz) {
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(true);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  function nameHandler(name: string) {
    setIsNameDialogOpen(false);
    setUserName(name);
    setShowQuiz(true);
  }
  return (
    <>
      <Head>
        <title>Quiz | {quiz.title}</title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />

        <meta name='description' content='Quixlar, the ultimate online quiz platform!' />
        <meta name='keywords' content='quiz, online quiz, quiz platform, Quixlar' />
        <meta name='author' content='Ovais Ahmad Khanday' />
      </Head>
      <main className='mt-10 '>
        <AskForUserNameDialog isOpen={isNameDialogOpen} onName={nameHandler} />
        {showQuiz && <QuizQuestionExam quiz={quiz} userName={userName} />}
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const quizId = context.params.id;
  async function getQuiz(quizId: string): Promise<QuizI | null> {
    try {
      const resp = await fetch(`${process.env.URL}/api/quiz/getQuiz`, {
        method: "POST",
        body: JSON.stringify({ quizId }),
      });
      if (resp.status >= 300) throw new Error("");
      const body = await resp.json();
      return body.quiz;
    } catch (error) {
      return null;
    }
  }

  const quiz = await getQuiz(quizId);
  //TODO: filter answers
  if (!quiz)
    return {
      redirect: {
        destination: "/takeQuiz/404",
      },
    };

  return {
    props: {
      quiz,
    },
  };
}
