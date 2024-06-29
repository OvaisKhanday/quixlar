import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Head from "next/head";

interface NotFoundProps {}

export default function NotFound({}: NotFoundProps) {
  return (
    <>
      <Head>
        <title>Quiz Not Found</title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />

        <meta name='description' content='Quixlar, the ultimate online quiz platform!' />
        <meta name='keywords' content='quiz, online quiz, quiz platform, Quixlar' />
        <meta name='author' content='Ovais Ahmad Khanday' />
      </Head>
      <main className='flex flex-col w-screen justify-center items-center mt-4 text-primary/60 px-5 max-w-3xl text-center mx-auto'>
        <Image src={"/404-page-not-found.svg"} alt='not found' className='h-32 my-10' width={400} height={200} />
        <h1 className='text-3xl font-bold text-primary/60 mb-4'>404: Quiz Not Found</h1>
        <p>The quiz you requested is not available or existent. Please rectify the URL and try again.</p>
        <Link href='/' className='mt-4'>
          <Button>Go back</Button>
        </Link>
      </main>
    </>
  );
}
