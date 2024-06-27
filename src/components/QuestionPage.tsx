import { CrossCircledIcon } from "@radix-ui/react-icons";
import { FC, useState } from "react";
import { v4 } from "uuid";
import ChooseQuestionTypeDialog from "./ChooseQuestionTypeDialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input, InputProps } from "./ui/input";

interface QuestionProps {
  questions: QuestionType[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}

export type QuestionType = {
  type: QuestionTypes;
  id: string;
  question: string;
} & (MCQ | Descriptive);

type MCQ = {
  type: "mcq";
  options: string[];
  correct: boolean[];
};

type Descriptive = {
  type: "descriptive";
  correct: string;
};
export type QuestionTypes = "mcq" | "descriptive";

const QuestionPage: FC<QuestionProps> = ({ questions: localQuestions, setQuestions: setLocalQuestions }) => {
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
      correct: [false, false, false, false],
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

  function updateQuestionText(questionId: string, newText: string) {
    const question: QuestionType = localQuestions.find((q) => q.id === questionId)!;
    question.question = newText;
    setLocalQuestions([...localQuestions]);
  }

  function updateOptionText(questionId: string, newText: string, optionNumber: number) {
    const question = localQuestions.find((q) => q.id === questionId)! as QuestionType & MCQ;
    question.options[optionNumber - 1] = newText;
    setLocalQuestions([...localQuestions]);
  }

  function updateCorrectAnswer(questionId: string, newText: string) {
    const question = localQuestions.find((q) => q.id === questionId)! as QuestionType & Descriptive;
    question.correct = newText;
    setLocalQuestions([...localQuestions]);
  }
  function handleCorrectCheckbox(checked: boolean, questionId: string, optionNumber: number) {
    console.log("called");
    const question = localQuestions.find((q) => q.id === questionId)! as QuestionType & MCQ;
    question.correct[optionNumber - 1] = checked;
    setLocalQuestions([...localQuestions]);
  }
  return (
    <div className=''>
      {localQuestions.map((q) => (
        <div className='my-4' key={q.id}>
          {q.type === "mcq" ? (
            <MCQ
              question={q}
              onDelete={deleteQuestion}
              onCorrectChange={handleCorrectCheckbox}
              updateQuestionText={updateQuestionText}
              updateOptionText={updateOptionText}
            />
          ) : (
            <Descriptive question={q} onDelete={deleteQuestion} updateQuestionText={updateQuestionText} updateCorrectAnswer={updateCorrectAnswer} />
          )}
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
      <pre>{JSON.stringify(localQuestions, null, 2)}</pre>
    </div>
  );
};

function MCQ({
  question,
  onDelete,
  onCorrectChange,
  updateQuestionText,
  updateOptionText,
}: {
  question: QuestionType & MCQ;
  onDelete: (_: string) => void;
  updateQuestionText: (_id: string, _text: string) => void;
  updateOptionText: (_id: string, _text: string, _optionNumber: number) => void;

  onCorrectChange: (_checked: boolean, _questionId: string, _optionNumber: number) => void;
}) {
  return (
    <div className=' m-2 p-2 outline outline-1 outline-slate-500/50 rounded-md'>
      <CrossCircledIcon className='h-4 w-4 float float-right mb-2 cursor-pointer' onClick={() => onDelete(question.id)} />
      <QuestionInput question={question} updateQuestionText={updateQuestionText} />
      <div className='grid grid-cols-2 gap-2'>
        {question.options.map((op, idx) => (
          <MCQOption
            key={`${question.id}-${idx}`}
            option={op}
            optionNumber={idx + 1}
            question={question}
            changeChecked={onCorrectChange}
            updateOptionText={updateOptionText}
          />
        ))}
      </div>
    </div>
  );
}

function MCQOption({
  option,
  optionNumber,
  question,
  changeChecked,
  updateOptionText,
}: {
  option: string;
  optionNumber: number;
  question: QuestionType & MCQ;
  changeChecked: (_checked: boolean, _questionId: string, _optionNumber: number) => void;
  updateOptionText: (_id: string, _text: string, _optionNumber: number) => void;
}) {
  return (
    <div className='flex flex-row items-center gap-2 outline outline-1 outline-slate-500/50 rounded-lg p-2'>
      <Input
        value={option}
        placeholder={`option ${optionNumber}`}
        required
        onChange={(e) => updateOptionText(question.id, e.target.value, optionNumber)}
      />
      <Checkbox
        checked={question.correct[optionNumber - 1]}
        onCheckedChange={(checked: boolean) => changeChecked(checked, question.id, optionNumber)}
      />
    </div>
  );
}
function Descriptive({
  question,
  onDelete,
  updateQuestionText,
  updateCorrectAnswer,
}: {
  question: QuestionType & Descriptive;
  onDelete: (_: string) => void;
  updateQuestionText: (_id: string, _text: string) => void;
  updateCorrectAnswer: (_id: string, _text: string) => void;
}) {
  return (
    <div className='m-2 p-2 outline outline-1 outline-slate-500/50 rounded-md'>
      <CrossCircledIcon className='h-4 w-4 float float-right mb-2 cursor-pointer' onClick={() => onDelete(question.id)} />
      <QuestionInput question={question} updateQuestionText={updateQuestionText} />
      <Input
        placeholder='enter the correct answer here'
        required
        value={question.correct}
        onChange={(e) => updateCorrectAnswer(question.id, e.target.value)}
      />
    </div>
  );
}

const QuestionInput: FC<
  InputProps & React.RefAttributes<HTMLInputElement> & { question: QuestionType; updateQuestionText: (_id: string, _text: string) => void }
> = ({ question, updateQuestionText }) => {
  return (
    <Input
      placeholder='enter your question here?'
      className='mb-4 h-12 bg-green-500/5'
      required
      value={question.question}
      onChange={(e) => updateQuestionText(question.id, e.target.value)}
    />
  );
};

export default QuestionPage;
