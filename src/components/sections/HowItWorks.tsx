import { motion } from 'framer-motion';

const STEPS = [
  {
    step: 1,
    title: 'Create',
    description: 'Design your quiz with an intuitive builder.',
  },
  {
    step: 2,
    title: 'Share',
    description: 'Get a link. Send it anywhere.',
  },
  {
    step: 3,
    title: 'Engage',
    description: 'Watch responses come in real-time.',
  },
  {
    step: 4,
    title: 'Analyze',
    description: 'Understand what your data is telling you.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 md:px-10 bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900">
            How it works.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-gray-300" />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pt-2"
            >
              {/* Step number */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 mb-6 font-light text-gray-900 text-sm relative z-10">
                {step.step}
              </div>

              {/* Content */}
              <h3 className="text-lg font-normal text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
