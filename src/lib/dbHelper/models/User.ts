import { Collection, ObjectId } from "mongodb";

export interface UserI extends Collection {
  name: string;
  email: string;
  image?: string;
  quizzes: ObjectId[];
}
