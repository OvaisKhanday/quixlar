import { Collection, Document, ObjectId } from "mongodb";

type Answer = boolean[] | string;

interface Participant extends Document {
  name: string;
  answers: Answer[];
}

interface UserI extends Collection {
  name: string;
  email: string;
  image?: string;
  quizzes: ObjectId[];
}
interface QuizI {
  _id?: ObjectId;
  title: string;
  description?: string;
  questions: QuestionType[];
  timestamp: Date;
  participants: Participant[];
}
interface Participant {
  _id?: ObjectId;
  name: string;
  answers: Answers;
  totalCorrect: number;
  timestamp: Date;
}
type QuestionType = {
  type: QuestionTypes;
  id: string;
  question: string;
} & (MCQType | DescriptiveType);

type MCQType = {
  type: "mcq";
  options: string[];
  correct: boolean[];
};

type DescriptiveType = {
  type: "descriptive";
  correct: string;
};
type QuestionTypes = "mcq" | "descriptive";

type Answers = {
  [questionId: string]: Answer;
};
