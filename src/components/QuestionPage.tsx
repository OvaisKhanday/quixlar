import { questionsContext } from "@/pages/dashboard/quiz";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { FC, useContext, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { v4 } from "uuid";
import ChooseQuestionTypeDialog from "./ChooseQuestionTypeDialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input, InputProps } from "./ui/input";

interface QuestionProps {
  form: UseFormReturn<FieldValues, any, undefined>;
}

export type QuestionType = {
  type: QuestionTypes;
  id: string;
  question: string;
} & (MCQ | Descriptive);

type MCQ = {
  type: "mcq";
  options: string[];
  correct: string[];
};

type Descriptive = {
  type: "descriptive";
  correct: string;
};
export type QuestionTypes = "mcq" | "descriptive";

const QuestionPage: FC<QuestionProps> = ({ form }) => {
  const { questions } = useContext(questionsContext);
  const [localQuestions, setLocalQuestions] = useState<QuestionType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function selectQuestionTypeHandler(questionType: QuestionTypes) {
    if (questionType === "mcq") setLocalQuestions((prev) => [...prev, getMCQQuestion()]);
    else if (questionType === "descriptive") setLocalQuestions((prev) => [...prev, getDescriptiveQuestion()]);
  }
  function getMCQQuestion() {
    const newQuestion: QuestionType = {
      type: "mcq",
      id: v4(),
      question: "",
      options: ["", "", "", ""],
      correct: [],
    };
    return newQuestion;
  }

  function getDescriptiveQuestion() {
    const newQuestion: QuestionType = {
      type: "descriptive",
      id: v4(),
      question: "",
      correct: "",
    };
    return newQuestion;
  }
  function deleteQuestion(id: string) {
    const filteredQuestions = localQuestions.filter((q) => q.id !== id);
    setLocalQuestions(filteredQuestions);
  }
  return (
    <div className=''>
      {localQuestions.map((q) => (
        <div className='my-4' key={q.id}>
          {q.type === "mcq" ? <MCQ question={q} onDelete={deleteQuestion} /> : <Descriptive question={q} onDelete={deleteQuestion} />}
        </div>
      ))}
      <Button type='button' variant='outline' onClick={() => setIsDialogOpen(true)}>
        Add question
      </Button>
      <ChooseQuestionTypeDialog
        isOpen={isDialogOpen}
        onSelect={(qt: QuestionTypes) => selectQuestionTypeHandler(qt)}
        closeDialog={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

function MCQ({ question, onDelete }: { question: QuestionType & MCQ; onDelete: (_: string) => void }) {
  return (
    <div className=' m-2 p-2 outline outline-1 outline-slate-500/50 rounded-md'>
      <CrossCircledIcon className='h-4 w-4 float float-right mb-2 cursor-pointer' onClick={() => onDelete(question.id)} />
      <QuestionInput />
      <div className='grid grid-cols-2 gap-2'>
        {question.options.map((op, idx) => (
          <MCQOption key={`${idx}-${op}`} option={op} optionNumber={idx + 1} />
        ))}
      </div>
    </div>
  );
}

function MCQOption({ option, optionNumber }: { option: string; optionNumber: number }) {
  return (
    <div className='flex flex-row items-center gap-2 outline outline-1 outline-slate-500/50 rounded-lg p-2'>
      <Input defaultValue={option} placeholder={`option ${optionNumber}`} />
      <Checkbox />
    </div>
  );
}
function Descriptive({ question, onDelete }: { question: QuestionType & Descriptive; onDelete: (_: string) => void }) {
  return (
    <div className='m-2 p-2 outline outline-1 outline-slate-500/50 rounded-md'>
      <CrossCircledIcon className='h-4 w-4 float float-right mb-2 cursor-pointer' onClick={() => onDelete(question.id)} />
      <QuestionInput />
      <Input placeholder='enter the correct answer here' />
    </div>
  );
}

const QuestionInput: FC<InputProps & React.RefAttributes<HTMLInputElement>> = () => {
  return <Input placeholder='enter your question here?' className='mb-4 h-12 bg-green-500/5' min={1} />;
};

// function QuestionTypeMapper({ question }: { question: Question }) {
//   switch (question.type) {
//     case "mcq-s":
//       return <MCQs question={question as Question & MCQsType} />;

//     case "mcq-m":
//       return <MCQm question={question} />;

//     case "short":
//       return <Short question={question} />;

//     case "long":
//       return <Long question={question} />;
//   }
// }

export default QuestionPage;

// function MCQs({ question }: { question: Question & MCQsType }) {
//   const { questions, setQuestions } = useContext(questionsContext);

//   function changeHandler(newVal: string, idx: number) {
//     const newQuestions: Question[] = questions.map((q: Question) => {
//       if (q.id === question.id) {
//         question.options[idx] = newVal;
//         return question;
//       } else return q;
//     });
//     setQuestions && setQuestions([...newQuestions]);
//     return null;
//   }
//   return (
//     <div>
//       <Input placeholder='question' />
//       <div className='grid grid-cols-2 gap-2 my-2'>
//         {question.options.map((ao, idx) => (
//           <div key={question.id + ao + idx} className='flex flex-row gap-2 items-center outline outline-1 outline-gray-500/50 rounded-lg p-1'>
//             <Input value={ao} onChange={(e) => changeHandler(e.target.value, idx)} />
//             <Checkbox id={question.id} name='d' checked={ao === question.correct} onCheckedChange={(check) => {}} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// function MCQm({ question }: { question: Question }) {
//   return (
//     <div>
//       <Input placeholder='question' />
//     </div>
//   );
// }
// function Short({ question }: { question: Question }) {
//   return (
//     <div>
//       <Input placeholder='question' />
//     </div>
//   );
// }
// function Long({ question }: { question: Question }) {
//   return (
//     <div>
//       <Input placeholder='question' />
//     </div>
//   );
// }
