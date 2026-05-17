import { motion } from 'framer-motion';

const FEATURES = [
  {
    number: '01',
    title: 'Quick Creation',
    description: 'Build beautiful quizzes in minutes. No coding, no complexity.',
  },
  {
    number: '02',
    title: 'Real-time Analytics',
    description: 'Track participation and performance instantly. See what matters.',
  },
  {
    number: '03',
    title: 'Seamless Sharing',
    description: 'Share with one link. Your audience can join immediately.',
  },
];

export function Features() {
  return (
    <section className="py-24 px-6 md:px-10 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Everything you need.
            <br />
            <span className="text-gray-400">Nothing you don't.</span>
          </h2>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="text-sm font-light text-blue-600 mb-4 tracking-wide">
                {feature.number}
              </div>
              <h3 className="text-xl font-normal text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-light">
                {feature.description}
              </p>
              <div className="mt-6 w-0 h-0.5 bg-gray-900 group-hover:w-8 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
