import { Document } from "mongodb";

export type Answer = boolean[] | string;

export interface Participant extends Document {
  name: string;
  answers: Answer[];
}
