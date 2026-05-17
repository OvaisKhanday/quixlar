import Head from 'next/head';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { VideoDemo } from '@/components/sections/VideoDemo';
import { DashboardShowcase } from '@/components/sections/DashboardShowcase';
import { CTA } from '@/components/sections/CTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Quixlar</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="description" content="Quixlar, the ultimate online quiz platform!" />
        <meta name="keywords" content="quiz, online quiz, quiz platform, Quixlar" />
        <meta name="author" content="Ovais Ahmad Khanday" />
        <meta property="og:title" content="Home | Quixlar" />
        <meta property="og:description" content="Welcome to Quixlar, the ultimate online quiz platform!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quixlar.vercel.app/" />
        <meta property="og:image" content="/new-quiz-1.png" />
      </Head>

      <main className="relative">
        <Hero />
        <Features />
        <HowItWorks />
        <VideoDemo />
        <DashboardShowcase />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
