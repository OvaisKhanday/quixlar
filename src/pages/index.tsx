import { Inter } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { Session } from "next-auth";
import SignInOrDashboardButton from "@/components/SignInOrDashboardButton";
import AppLogo from "@/components/AppLogo";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className='px-10 lg:px-5 py-4 md:py-10 max-w-7xl mx-auto'>
      <AppLogo className='text-4xl lg:text-7xl text-center' />
      <h4 className='text-center font-semibold text-primary/65'>The ultimate online quiz platform</h4>
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center mt-10 items-center text-center'>
        <div className='text-primary/60'>
          <p>
            Introducing Quixlar, the ultimate online quiz platform designed to make quiz creation and participation a breeze! Whether you’re an
            educator, trainer, or just someone who loves to test knowledge, Quixlar offers a seamless experience for both quiz makers and takers. With
            Quixlar, admins can effortlessly create engaging quizzes on any topic and share them instantly through a simple link.
          </p>

          <p>
            Quixlar’s intuitive interface allows for quick quiz setup with customizable question types, including multiple choice, and short answer.
            Participants can easily access quizzes on any device, making it perfect for remote learning, virtual events, or just friendly competition.
          </p>
          <p>
            Real-time scoring and analytics provide immediate feedback, helping users track progress and identify areas for improvement. Plus,
            Quixlar’s robust security ensures that all quiz data is protected. Say goodbye to tedious quiz preparation and hello to the future of
            online quizzing with Quixlar. Join our community of quiz enthusiasts and start creating, sharing, and taking quizzes today!
          </p>
          <div className='mt-8' />
          <SignInOrDashboardButton />
        </div>

        <Image src={"/quiz-take.png"} className='shadow-xl rounded-lg md:rotate-12' alt='picture of quiz' width={450} height={670} />
      </div>
      <div className='my-2'>
        <hr />
        <p className='text-primary/70 text-sm text-center'>
          Designed and Developed by{" "}
          <a href='https://khandayovais.co' target='_blank'>
            <Button variant={"link"} className='underline'>
              Ovais Ahmad Khanday
            </Button>
          </a>{" "}
          with ❤️
        </p>
      </div>
    </main>
  );
}
