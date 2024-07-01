import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import ParticipantsTable from "@/components/ParticipantsTable";
import QuizCards from "@/components/QuizCards";
import QuizDetails from "@/components/QuizDetails";
import Head from "next/head";
import DashboardLayout from "@/components/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { QuizI } from "@/lib/types";

interface QuizDetailsPageProps {
  quiz: QuizI;
  totalParticipants: number;
  successRate: number;
  totalQuestions: number;
}
const QuizDetailsPage: NextPageWithLayout<QuizDetailsPageProps> = ({ quiz, totalParticipants, successRate, totalQuestions }) => {
  return (
    <>
      <Head>
        <title>Quiz | {quiz.title}</title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />

        <meta name='description' content='Quixlar, the ultimate online quiz platform!' />
        <meta name='keywords' content='quiz, online quiz, quiz platform, Quixlar' />
        <meta name='author' content='Ovais Ahmad Khanday' />
      </Head>
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
    </>
  );
};

export default QuizDetailsPage;

QuizDetailsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

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
    // division by zero
    successRate = 0;
  }
  return {
    props: {
      quiz,
      totalParticipants: totalParticipants ?? 0,
      successRate: successRate ?? 0,
      totalQuestions: totalQuestions ?? 0,
    },
  };
}
