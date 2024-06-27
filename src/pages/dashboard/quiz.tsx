import { QuestionType } from "@/components/AddQuestionDialog";
import QuestionPage from "@/components/QuestionPage";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getServerSession } from "next-auth";
import React, { createContext, useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "./layout";
import { format } from "path";

export type Question = {
  id: string;
  type: QuestionType;
  question: string;
} & (MCQs | MCQm | ShortLong);

export type MCQs = {
  options: string[];
  correct: string;
};
export type MCQm = {
  options: string[];
  correct: string[];
};
export type ShortLong = {
  correct: string;
};

export interface QuestionContextType {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>> | null;
}
export const questionsContext = createContext<QuestionContextType>({
  questions: [],
  setQuestions: null,
});
function QuestionProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);

  const value = { questions, setQuestions };
  return <questionsContext.Provider value={value}>{children}</questionsContext.Provider>;
}

export default function Quiz() {
  async function handleSubmit() {
    const response = await fetch("/api/quiz/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "Geography", description: "descripton" }),
    });
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  function onSubmit(f: FieldValues) {
    console.log(f);
  }
  return (
    <Layout>
      <QuestionProvider>
        <div className='px-4 max-w-lg'>
          <h1 className='font-semibold text-2xl'>Add a Quiz</h1>
          <p>Add title and description to the quiz and select the type of question you want to add.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Geography Test' {...field} required />
                    </FormControl>
                    <FormDescription>Provide the title of the quiz.</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='This is a geography test' rows={3} {...field} />
                    </FormControl>
                    <FormDescription>Provide the description of the quiz.</FormDescription>
                  </FormItem>
                )}
              />
              <div>
                <QuestionPage form={form} />
              </div>
              <div className='flex flex-row gap-2'>
                <Button type='submit'>Submit</Button>
              </div>
            </form>
          </Form>
        </div>
        <Log />
      </QuestionProvider>
    </Layout>
  );
}

function Log() {
  const { questions } = useContext(questionsContext);
  return <pre>{JSON.stringify(questions, null, 2)}</pre>;
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log("ssp", session);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
      hello: "world",
    },
  };
}
