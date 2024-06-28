import DashboardCards from "@/components/DashboardCards";
import Quizzes from "@/components/Quizzes";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "./layout";
import { QuizI } from "./quiz";

interface DashboardProps {
  session: Session | null;
  quizzes: QuizI[];
  quizzesCount: number;
  totalParticipants: number;
  successRate: number;
}

export default function Dashboard({ session, quizzes, quizzesCount, totalParticipants, successRate }: DashboardProps) {
  return (
    <div>
      <Layout>
        <div className='my-8 mx-auto px-2 max-w-7xl'>
          <DashboardCards quizzesCount={quizzesCount} totalParticipants={totalParticipants} successRate={successRate} />
          <div className='mt-4 md:mt-10' />
          <Quizzes quizzes={quizzes} />
        </div>
      </Layout>
    </div>
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

  async function getQuizzes(): Promise<QuizI[]> {
    try {
      const session = await getServerSession(context.req, context.res, authOptions);
      if (!session) throw new Error("user not found");
      const resp = await fetch("http://localhost:3000/api/quiz/get", {
        method: "POST",
        body: JSON.stringify({ email: session?.user?.email }),
      });
      const body = await resp.json();
      return body.quizzes;
    } catch (error) {
      return [];
    }
  }

  const quizzes = await getQuizzes();
  const totalParticipants = quizzes.reduce((acc, q) => acc + q.participants.length, 0);
  const totalQuestions = quizzes.reduce((acc, q) => acc + q.questions.length, 0);
  let totalAchievableScore = 0;
  let achievedScore = 0;

  for (const _q of quizzes) {
    const participants = _q.participants;
    totalAchievableScore += _q.questions.length * participants.length;
    achievedScore += participants.reduce((acc, _p) => acc + _p.totalCorrect, 0);
  }

  const successRate = Math.floor((achievedScore / totalAchievableScore) * 100);

  return {
    props: {
      session: session,
      quizzes: quizzes,
      quizzesCount: quizzes.length,
      totalParticipants,
      totalQuestions,
      successRate,
    },
  };
}
