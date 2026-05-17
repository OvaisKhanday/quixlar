import { motion } from 'framer-motion';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import AppLogo from '@/components/AppLogo';

export function Hero() {
  const { data: session } = useSession();

  const handleGetStarted = () => {
    if (!session) {
      signIn('google');
    } else {
      window.location.href = '/dashboard';
    }
  };

  const handleWatchDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 py-20 bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <AppLogo className="text-5xl md:text-6xl text-center text-gray-900" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl font-light text-gray-900 mb-6 leading-tight tracking-tight"
        >
          Create beautiful quizzes,
          <br />
          <span className="font-normal text-blue-600">effortlessly.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-500 mb-12 leading-relaxed font-light max-w-xl mx-auto"
        >
          Build engaging quizzes, track real-time analytics, and share instantly. Everything you need in one elegant platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-light hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
          >
            Get Started
          </button>
          <button
            onClick={handleWatchDemo}
            className="px-8 py-3 border border-gray-300 text-gray-900 rounded-lg font-light hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
          >
            Watch Demo
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-20 flex justify-center"
        >
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
