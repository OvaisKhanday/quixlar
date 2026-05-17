import { motion } from 'framer-motion';
import Image from 'next/image';

export function DashboardShowcase() {
  return (
    <section className="py-24 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-6 leading-tight">
              One dashboard.
              <br />
              <span className="text-gray-400">All your quizzes.</span>
            </h2>

            <p className="text-gray-500 leading-relaxed font-light text-lg mb-12">
              Manage everything from a single, beautiful dashboard. Monitor participation, view analytics, and make informed decisions.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="text-blue-600 font-light text-lg">✓</div>
                <div>
                  <h4 className="font-normal text-gray-900 mb-1">Live Updates</h4>
                  <p className="text-gray-500 font-light text-sm">See responses as they happen</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-blue-600 font-light text-lg">✓</div>
                <div>
                  <h4 className="font-normal text-gray-900 mb-1">Performance Insights</h4>
                  <p className="text-gray-500 font-light text-sm">Understand what works and what doesn&apos;t</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-blue-600 font-light text-lg">✓</div>
                <div>
                  <h4 className="font-normal text-gray-900 mb-1">Easy Export</h4>
                  <p className="text-gray-500 font-light text-sm">Download results whenever you need them</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dashboard Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group"
          >
            <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-gray-50">
              <Image
                src="/dashboard-2.png"
                alt="Quixlar dashboard"
                width={700}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
