import { getServerSession } from "next-auth";
import Layout from "../layout";
import { QuizI } from "../newQuiz";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import ParticipantsTable from "@/components/ParticipantsTable";
import QuizCards from "@/components/QuizCards";
import QuizDetails from "@/components/QuizDetails";

interface QuizDetailsPageProps {
  quiz: QuizI;
  totalParticipants: number;
  successRate: number;
  totalQuestions: number;
}
export default function QuizDetailsPage({ quiz, totalParticipants, successRate, totalQuestions }: QuizDetailsPageProps) {
  // quiz details

  return (
    <Layout>
      <div className='my-8 mx-auto px-2 max-w-7xl'>
        <div className='mb-8'>
          <QuizDetails title={quiz.title} description={quiz.description ?? ""} quizId={quiz._id?.toString() ?? ""} />
        </div>
        <QuizCards successRate={successRate} totalParticipants={totalParticipants} totalQuestions={totalQuestions} />
        <div className='w-full mt-10'>
          {totalParticipants === 0 ? (
            <p className='text-primary/40 text-center'>No one has yet taken this quiz, share the quiz link now.</p>
          ) : (
            <ParticipantsTable quiz={quiz} totalQuestions={totalQuestions} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
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
  if (!quiz)
    return {
      redirect: {
        destination: "/dashboard/quiz/404",
      },
    };
  const totalQuestions = quiz.questions.length ?? 0;
  const totalParticipants = quiz.participants.length ?? 0;
  const totalAchievableScore = totalQuestions * totalParticipants;
  const totalAchievedScore = quiz.participants.reduce((acc, p) => acc + p.totalCorrect, 0);
  let successRate = 0;
  try {
    successRate = Math.floor((totalAchievedScore / totalAchievableScore) * 100);
  } catch (error) {
    successRate = 0;
  }

  return {
    props: {
      quiz,
      totalParticipants,
      successRate,
      totalQuestions,
    },
  };
}
