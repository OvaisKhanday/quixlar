import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import Link from "next/link";
import { Button } from "./ui/button";

interface DashboardCardsProps {
  quizzesCount: number;
  totalParticipants: number;
  successRate: number;
}

const DashboardCards: FC<DashboardCardsProps> = ({ quizzesCount, totalParticipants, successRate }) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 '>
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
          <CardTitle>Total Participation</CardTitle>
          <CardDescription>The total number of times quizzes were taken</CardDescription>
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
  );
};

export default DashboardCards;
