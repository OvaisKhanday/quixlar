import Quizzes from "@/components/Quizzes";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "./layout";
import { QuizI } from "./quiz";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import DashboardCards from "@/components/DashboardCards";

interface DashboardProps {
  session: Session | null;
  quizzes: QuizI[];
  quizzesCount: number;
  totalParticipants: number;
  successRate: number;
}

export default function Dashboard({ session, quizzes, quizzesCount, totalParticipants, successRate }: DashboardProps) {
  //   const { data: session } = useSession();
  console.log(session);
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

  return {
    props: {
      session: session,
      quizzes: quizzes,
      quizzesCount: quizzes.length,
      totalParticipants: 47,
      successRate: 67,
    },
  };
}
