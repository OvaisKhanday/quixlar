import { MCQs as MCQsType, Question, questionsContext } from "@/pages/dashboard/quiz";
import { FC, useContext, useState } from "react";
import { Input } from "./ui/input";
import { Select, SelectItem } from "./ui/select";
import { Checkbox } from "./ui/checkbox";

interface QuestionProps {}

const QuestionPage: FC<QuestionProps> = () => {
  const { questions } = useContext(questionsContext);
  return (
    <div>
      {questions.map((ques, idx) => (
        <div key={ques.id} className='border p-2 m-2'>
          <p className='opacity-60 text-xs'>Question {idx + 1}</p>
          <QuestionTypeMapper question={ques} />
        </div>
      ))}
    </div>
  );
};

function QuestionTypeMapper({ question }: { question: Question }) {
  switch (question.type) {
    case "mcq-s":
      return <MCQs question={question as Question & MCQsType} />;

    case "mcq-m":
      return <MCQm question={question} />;

    case "short":
      return <Short question={question} />;

    case "long":
      return <Long question={question} />;
  }
}

export default QuestionPage;

function MCQs({ question }: { question: Question & MCQsType }) {
  const { questions, setQuestions } = useContext(questionsContext);

  function changeHandler(newVal: string, idx: number) {
    const newQuestions: Question[] = questions.map((q: Question) => {
      if (q.id === question.id) {
        question.options[idx] = newVal;
        return question;
      } else return q;
    });
    setQuestions && setQuestions([...newQuestions]);
    return null;
  }
  return (
    <div>
      <Input placeholder='question' />
      <div className='grid grid-cols-2 gap-2 my-2'>
        {question.options.map((ao, idx) => (
          <div key={question.id + ao + idx} className='flex flex-row gap-2 items-center outline outline-1 outline-gray-500/50 rounded-lg p-1'>
            <Input value={ao} onChange={(e) => changeHandler(e.target.value, idx)} />
            <Checkbox id={question.id} name='d' checked={ao === question.correct} onCheckedChange={(check) => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}
function MCQm({ question }: { question: Question }) {
  return (
    <div>
      <Input placeholder='question' />
    </div>
  );
}
function Short({ question }: { question: Question }) {
  return (
    <div>
      <Input placeholder='question' />
    </div>
  );
}
function Long({ question }: { question: Question }) {
  return (
    <div>
      <Input placeholder='question' />
    </div>
  );
}
