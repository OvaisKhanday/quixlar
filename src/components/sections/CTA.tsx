import { motion } from 'framer-motion';
import { useSession, signIn } from 'next-auth/react';

export function CTA() {
  const { data: session } = useSession();

  const handleGetStarted = () => {
    if (!session) {
      signIn('google');
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <section className="py-24 px-6 md:px-10 bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
            Ready to create
            <br />
            amazing quizzes?
          </h2>

          <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed max-w-2xl mx-auto">
            Join educators and trainers who trust Quixlar to deliver engaging learning experiences.
          </p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={handleGetStarted}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-light hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
