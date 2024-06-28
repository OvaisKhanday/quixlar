import Quizzes from "@/components/Quizzes";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "./layout";
import { QuizI } from "./quiz";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

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
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 '>
            <Card className='text-center'>
              <CardHeader>
                <CardTitle>Total quizzes</CardTitle>
                <CardDescription>The total number of quizzes created</CardDescription>
              </CardHeader>
              <CardContent className='text-2xl'>
                <h1>{quizzesCount}</h1>
              </CardContent>
            </Card>
            <Card className='text-center'>
              <CardHeader>
                <CardTitle>Total Participants</CardTitle>
                <CardDescription>The total number of users, who took quizzes</CardDescription>
              </CardHeader>
              <CardContent className='text-2xl'>
                <h1>{totalParticipants}</h1>
              </CardContent>
            </Card>
            <Card className='text-center'>
              <CardHeader>
                <CardTitle>Success rate</CardTitle>
                <CardDescription>Percentage of questions correctly answered by the participants</CardDescription>
              </CardHeader>
              <CardContent className='text-center flex flex-row items-center justify-center gap-2'>
                <p className='text-primary/70'>{`${successRate % 100}%`}</p>
                <Progress value={successRate % 100} className='h-4' />
              </CardContent>
            </Card>
            <Card className='text-center bg-accent'>
              <CardHeader>
                <CardTitle>Add quiz</CardTitle>
                <CardDescription>Create a new quiz</CardDescription>
              </CardHeader>
              <CardContent className='text-center'>
                <Link href={"/dashboard/quiz"}>
                  <Button>Create</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

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
