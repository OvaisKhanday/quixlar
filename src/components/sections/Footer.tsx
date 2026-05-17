import { motion } from 'framer-motion';
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Left Section */}
          <p className="text-gray-500 text-sm font-light text-center md:text-left">
            <span className="text-gray-900">Quixlar</span> © {currentYear} • Crafted by{' '}
            <a
              href="https://khanday.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              Ovais Ahmad Khanday
            </a>
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            <motion.a
              href="https://linkedin.com/in/ovaiskhanday"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInLogoIcon className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://twitter.com/ovaiskhanday/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              aria-label="Twitter"
            >
              <TwitterLogoIcon className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://github.com/ovaiskhanday/quixlar"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
              aria-label="GitHub"
            >
              <GitHubLogoIcon className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
