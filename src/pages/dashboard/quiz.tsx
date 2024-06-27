import QuestionPage, { QuestionType } from "@/components/QuestionPage";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "./layout";
import { useRouter } from "next/navigation";

export interface QuizI {
  _id?: string;
  title: string;
  description?: string;
  questions: QuestionType[];
  timestamp: Date;
}
async function saveQuizToDatabase(quiz: QuizI) {
  try {
    const response = await fetch("/api/quiz/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    });
    if (response.status >= 300) throw new Error("an error occurred");
    console.log("before redirect");
    // redirect("/dashboard");
  } catch (error) {
    console.log(error);
    //TODO: Show toast
  }
}
export default function Quiz() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const router = useRouter();

  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(f: FieldValues) {
    const newQuiz: QuizI = {
      title: f.title,
      description: f.description,
      questions: questions,
      timestamp: new Date(),
    };
    await saveQuizToDatabase(newQuiz);
    router.replace("/dashboard");
  }
  return (
    <Layout>
      <div className='px-4 max-w-lg'>
        <h1 className='font-semibold text-2xl text-center'>Add a Quiz</h1>
        <p className='mb-10 text-center'>Add title and description to the quiz and select the type of question you want to add.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Geography Test' className='h-12' {...field} required />
                  </FormControl>
                  <FormDescription>Provide the title of the quiz.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormControl>
                    <Textarea placeholder='This is a geography test' rows={3} {...field} />
                  </FormControl>
                  <FormDescription>Provide the description of the quiz.</FormDescription>
                </FormItem>
              )}
            />
            <div className='my-8'>
              <QuestionPage questions={questions} setQuestions={setQuestions} />
            </div>
            <div className='flex flex-row gap-2'>
              <Button type='submit'>Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
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
