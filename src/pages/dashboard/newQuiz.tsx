import QuestionPage from "@/components/QuestionPage";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { authOptions } from "../api/auth/[...nextauth]";
import DashboardLayout from "@/components/DashboardLayout";
import { NextPageWithLayout } from "../_app";
import { QuestionType, QuizI } from "@/lib/types";

const Quiz: NextPageWithLayout = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

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
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: `The quiz with title "${quiz.title}" was not added`,
      });
    }
  }

  async function onSubmit(f: FieldValues) {
    const newQuiz: QuizI = {
      title: f.title,
      description: f.description,
      questions: questions,
      timestamp: new Date(),
      participants: [],
    };
    await saveQuizToDatabase(newQuiz);
    router.replace("/dashboard");
  }
  return (
    <>
      <Head>
        <title>Create a quiz</title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />

        <meta name='description' content='Quixlar, the ultimate online quiz platform!' />
        <meta name='keywords' content='quiz, online quiz, quiz platform, Quixlar' />
        <meta name='author' content='Ovais Ahmad Khanday' />
      </Head>
      <div className='px-4 max-w-4xl mx-auto mt-8'>
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
    </>
  );
};

export default Quiz;

Quiz.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
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
