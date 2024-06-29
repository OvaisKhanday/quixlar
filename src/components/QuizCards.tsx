import { AllHTMLAttributes, FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
interface QuizCardsProps extends AllHTMLAttributes<HTMLDivElement> {
  totalQuestions: number;
  totalParticipants: number;
  successRate: number;
}

const QuizCards: FC<QuizCardsProps> = ({ totalQuestions, totalParticipants, successRate, ...props }) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 ' {...props}>
      <Card className='text-center'>
        <CardHeader>
          <CardTitle>Total Questions</CardTitle>
          <CardDescription>The total number of questions in this quiz</CardDescription>
        </CardHeader>
        <CardContent className='text-2xl'>
          <h1>{totalQuestions}</h1>
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
      <Card className='text-center col-span-2 md:col-span-1'>
        <CardHeader>
          <CardTitle>Success rate</CardTitle>
          <CardDescription>Percentage of questions correctly answered by the participants</CardDescription>
        </CardHeader>
        <CardContent className='text-center flex flex-row items-center justify-center gap-2'>
          <p className='text-primary/70'>{`${successRate}%`}</p>
          <Progress value={successRate} className='h-4' />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCards;
