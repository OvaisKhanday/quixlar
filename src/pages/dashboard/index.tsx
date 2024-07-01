import DashboardCards from "@/components/DashboardCards";
import Quizzes from "@/components/Quizzes";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { QuizI } from "./newQuiz";
import Head from "next/head";
import { NextPageWithLayout } from "../_app";
import { NextPage } from "next";
import DashboardLayout from "@/components/DashboardLayout";

interface DashboardProps {
  session: Session | null;
  quizzes: QuizI[];
  quizzesCount: number;
  totalParticipants: number;
  successRate: number;
}

const Dashboard: NextPageWithLayout<DashboardProps> = ({ session, quizzes, quizzesCount, totalParticipants, successRate }) => {
  return (
    <>
      <Head>
        <title>Dashboard ✨</title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />

        <meta name='description' content='Quixlar, the ultimate online quiz platform!' />
        <meta name='keywords' content='quiz, online quiz, quiz platform, Quixlar' />
        <meta name='author' content='Ovais Ahmad Khanday' />
      </Head>
      <main>
        <div className='my-8 mx-auto px-2 max-w-7xl'>
          <DashboardCards quizzesCount={quizzesCount} totalParticipants={totalParticipants} successRate={successRate ?? 0} />
          <div className='mt-4 md:mt-10' />
          {quizzesCount === 0 ? (
            <p className='text-primary/40 text-center mt-10'>You have not created any quiz yet, what are you waiting for.</p>
          ) : (
            <Quizzes quizzes={quizzes} />
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
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
  async function getQuizzes(): Promise<QuizI[]> {
    try {
      const resp = await fetch(`${process.env.URL}/api/quiz/get`, {
        method: "POST",
        body: JSON.stringify({ email: session?.user?.email }),
      });
      if (resp.status >= 300) throw new Error("");
      const body = await resp.json();
      return body.quizzes;
    } catch (error) {
      return [];
    }
  }

  const quizzes = await getQuizzes();
  if (quizzes.length === 0)
    return {
      props: {
        session: session,
        quizzes: quizzes,
        quizzesCount: quizzes.length,
        totalParticipants: 0,
        totalQuestions: 0,
        successRate: 0,
      },
    };
  const totalParticipants = quizzes.reduce((acc, q) => acc + q.participants.length, 0);
  const totalQuestions = quizzes.reduce((acc, q) => acc + q.questions.length, 0);
  let totalAchievableScore = 0;
  let achievedScore = 0;

  for (const _q of quizzes) {
    const participants = _q.participants;
    totalAchievableScore += _q.questions.length * participants.length;
    achievedScore += participants.reduce((acc, _p) => acc + _p.totalCorrect, 0);
  }
  let successRate = 0;
  try {
    successRate = Math.floor((achievedScore / totalAchievableScore) * 100);
  } catch (error) {
    // division by zero
    successRate = 0;
  }

  return {
    props: {
      session: session,
      quizzes: quizzes,
      quizzesCount: quizzes.length,
      totalParticipants: totalParticipants ?? 0,
      totalQuestions: totalQuestions ?? 0,
      successRate: successRate ?? 0,
    },
  };
}
