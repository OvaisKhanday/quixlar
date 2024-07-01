import AppLogo from "@/components/AppLogo";
import SignInOrDashboardButton from "@/components/SignInOrDashboardButton";
import { Button } from "@/components/ui/button";
import Head from "next/head";
// import { Inter } from "next/font/google";
import Image from "next/image";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Quixlar</title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <meta name='description' content='Quixlar, the ultimate online quiz platform!' />
        <meta name='keywords' content='quiz, online quiz, quiz platform, Quixlar' />
        <meta name='author' content='Ovais Ahmad Khanday' />
        <meta property='og:title' content='Home | Quixlar' />
        <meta property='og:description' content='Welcome to Quixlar, the ultimate online quiz platform!' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://quixlar.vercel.app/' />
        <meta property='og:image' content='/new-quiz-1.png' />
      </Head>
      <main className={"px-10 lg:px-5 py-4 md:py-10 max-w-7xl mx-auto"}>
        <AppLogo className='text-5xl lg:text-6xl text-center' />
        <h4 className='text-center font-semibold text-primary/65'>The ultimate online quiz platform</h4>

        <div className='flex flex-col gap-6 lg:gap-12 justify-center mt-10 items-center text-center'>
          <div className='text-primary/60  leading-7'>
            <p>
              Introducing Quixlar, <span className='text-primary-foreground bg-primary/70 p-1 rounded-sm'>the ultimate online quiz platform</span>{" "}
              designed to make quiz creation and participation a breeze! Whether you’re an educator, trainer, or just someone who loves to test
              knowledge, Quixlar offers a seamless experience for both quiz makers and takers. With Quixlar, admins can effortlessly create engaging
              quizzes on any topic and share them instantly through a simple link.
            </p>

            <p>
              Quixlar’s intuitive interface allows for quick quiz setup with customizable question types, including multiple choice, and short answer.
              Participants can easily access quizzes on any device, making it perfect for remote learning, virtual events, or just friendly
              competition.
            </p>
            <p>
              Real-time scoring and analytics provide immediate feedback, helping users track progress and identify areas for improvement. Plus,
              Quixlar’s robust security ensures that all quiz data is protected. Say goodbye to tedious quiz preparation and hello to the future of
              online quizzing with Quixlar. Join our community of quiz enthusiasts and start creating, sharing, and taking quizzes today!
            </p>
            <div className='mt-8' />
            <SignInOrDashboardButton />
          </div>
          <video
            src='/intro-1.webm'
            className='border-none shadow-xl mx-auto outline outline-8  rounded-md outline-primary/10'
            width={800}
            controls
            autoPlay
            muted
          />
          {/* <Image src={"/quiz-take.png"} className='shadow-xl rounded-lg md:rotate-12' alt='picture of quiz' width={450} height={670} /> */}
        </div>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-16 justify-center mt-10 items-center text-center'>
          <Image
            src='/dashboard-2.png'
            className='order-2 lg:order-1 mt-4 md:mt-10 shadow-xl rounded-lg md:-rotate-2'
            alt='dashboard screen'
            width={700}
            height={450}
          />
          <div className='order-1 lg:order-2 text-primary/60'>
            <h2 className='font-bold text-primary text-2xl mb-3'>Dashboard</h2>
            <p>
              Admins can create a new quiz from there dashboard. Not only that, live participation count, and success rate of quizzes are also
              provided to them. This enables them to clearly identify the quizzes with best results and assess the understanding of recipients.
            </p>
          </div>
        </div>
        <footer className='my-2 mt-8 lg:mt-12'>
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
        </footer>
      </main>
    </>
  );
}
