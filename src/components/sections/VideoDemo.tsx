import { motion } from 'framer-motion';
import { useRef } from 'react';

export function VideoDemo() {
  return (
    <section id="demo" className="py-24 px-6 md:px-10 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            See it in action.
          </h2>
          <p className="text-gray-500 font-light">
            Watch how Quixlar makes quiz creation simple and elegant.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-gray-900"
        >
          <video
            src="/intro-1.webm"
            className="w-full h-auto"
            controls
            autoPlay
            muted
            loop
          />
        </motion.div>
      </div>
    </section>
  );
}
