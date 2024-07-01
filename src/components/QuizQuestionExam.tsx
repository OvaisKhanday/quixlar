import { useToast } from "@/components/ui/use-toast";
import { Answers, DescriptiveType, MCQType, QuestionType, QuizI } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import AppLogo from "./AppLogo";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";

interface QuizQuestionExamProps {
  quiz: QuizI;
  userName: string;
}

const QuizQuestionExam: FC<QuizQuestionExamProps> = ({ quiz, userName }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [score, setScore] = useState({
    show: false,
    totalQuestion: 0,
    totalCorrect: 0,
  });

  const [answers, setAnswers] = useState<Answers>(() => {
    const initialAnswers: Answers = {};
    for (const q of quiz.questions) {
      initialAnswers[q.id] = q.type === "mcq" ? [false, false, false, false] : "";
    }
    return initialAnswers;
  });

  async function submitHandler() {
    try {
      const resp = await fetch("/api/quiz/submit", {
        method: "POST",
        body: JSON.stringify({
          name: userName,
          answers,
          quizId: quiz._id,
        }),
      });
      if (resp.status >= 300) throw new Error("quiz not found");
      const { totalQuestion, totalCorrect } = await resp.json();
      setScore({
        show: true,
        totalCorrect,
        totalQuestion,
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "cannot save, there occurred an error while saving the user response. It may be because the admin has deleted the quiz",
        variant: "destructive",
      });
    }
  }

  function changeChecked(questionId: string, idx: number, checked: boolean) {
    const answer = answers[questionId] as boolean[];
    answer[idx] = checked;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }

  function changeAnswerText(questionId: string, newText: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: newText }));
  }

  return (
    <div className='max-w-3xl mx-auto my-2 p-4'>
      <QuizHeader quiz={quiz} userName={userName} />
      {!score.show ? (
        quiz.questions.map((q) => (
          <div key={q.id} className='outline outline-1 outline-primary/20 rounded-lg p-2 mb-12 shadow-md'>
            {q.type === "mcq" ? (
              <TakeMCQ question={q} answer={answers[q.id] as boolean[]} changeChecked={changeChecked} />
            ) : (
              <TakeDescriptive question={q} answer={answers[q.id] as string} changeAnswerText={changeAnswerText} />
            )}
          </div>
        ))
      ) : (
        <Score totalCorrect={score.totalCorrect} totalQuestion={score.totalQuestion} />
      )}
      {score.show ? (
        <Button className='mx-auto block mt-10' onClick={() => router.refresh()}>
          Take Again
        </Button>
      ) : (
        <Button onClick={submitHandler}>Submit</Button>
      )}
    </div>
  );
};

function QuizHeader({ quiz, userName }: QuizQuestionExamProps) {
  return (
    <div className='text-left mb-10'>
      <AppLogo className='text-center text-4xl lg:text-6xl' />
      <h1 className='text-xl text-primary/60 font-semibold text-center mt-10 '>
        Quiz: <span className='text-primary'>{quiz.title}</span>
      </h1>
      <p className='text-primary/60 text-center'>Description: {quiz.description}</p>
      <p className='tracking-tight mt-5 text-center text-primary/70'>
        Welcome <span className='font-semibold'>{userName}</span>. There are two type of questions (MCQs and Descriptive). MCQs can have more than one
        options as their correct answer. Correct MCQ will be the one, for which you <span className='font-semibold'>select all that may apply</span>.
        If any field is not selected, the score is 0. Descriptive questions require to type the exact answer. Answer is{" "}
        <span className='font-semibold'>case insensitive</span>
      </p>
    </div>
  );
}

function Score({ totalCorrect, totalQuestion }: { totalCorrect: number; totalQuestion: number }) {
  return (
    <div className=' mx-auto p-8 rounded-full outline shadow-md text-center h-36 w-36 flex flex-col justify-center items-center'>
      <p className='text-xl'>
        <span className='text-2xl font-bold'>{totalCorrect}</span>
        {" / "}
        <span>{totalQuestion}</span>
      </p>
      <Progress value={(totalCorrect / totalQuestion) * 100} />
    </div>
  );
}
export default QuizQuestionExam;

function TakeMCQ({
  question,
  answer,
  changeChecked,
}: {
  question: QuestionType & MCQType;
  answer: boolean[];
  changeChecked: (_questionId: string, _idx: number, _checked: boolean) => void;
}) {
  return (
    <>
      <Question title={question.question} />
      <div className='grid grid-cols-2 gap-2'>
        {question.options.map((op, idx) => (
          <div
            key={`
                ${question.id}-${idx}`}
            className='outline outline-1 outline-primary/10 rounded-lg flex flex-row gap-4 items-center p-2'
          >
            <Checkbox checked={answer[idx]} onCheckedChange={(checked: boolean) => changeChecked(question.id, idx, checked)} />
            <p>{op}</p>
          </div>
        ))}
      </div>
    </>
  );
}
function TakeDescriptive({
  question,
  answer,
  changeAnswerText,
}: {
  question: QuestionType & DescriptiveType;
  answer: string;
  changeAnswerText: (_questionId: string, _newText: string) => void;
}) {
  return (
    <>
      <Question title={question.question} />
      <Input
        required
        placeholder='enter your answer here'
        className='h-12'
        value={answer}
        onChange={(e) => changeAnswerText(question.id, e.target.value)}
      />
    </>
  );
}

function Question({ title }: { title: string }) {
  return <h3 className='text-md  outline-1 outline-primary/30 p-2 mb-6 rounded-lg text-wrap'>{title}</h3>;
}
