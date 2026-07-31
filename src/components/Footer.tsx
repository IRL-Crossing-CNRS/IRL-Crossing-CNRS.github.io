import { motion } from 'framer-motion';
import { EASE_REFINED } from '../lib/motion';
import logoDark from '../assets/logo/crossing-wordmark-dark.png';
import logoLight from '../assets/logo/crossing-wordmark-light.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE_REFINED }}
      className="border-t border-border"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center text-sm text-muted sm:flex-row sm:justify-between sm:text-left">
        <p>&copy; {year} IRL CROSSING CNRS. All rights reserved.</p>
        <a
          href="https://crossing.cnrs.fr/"
          target="_blank"
          rel="noreferrer noopener"
          className="transition-colors duration-200 hover:text-accent"
        >
          <img src="" alt="" />
        </a>
        <Link to="/" className="flex items-center gap-3" aria-label="IRL CROSSING - Resources">
          <img src={logoLight} alt="" className="block h-6 w-auto dark:hidden" />
          <img src={logoDark} alt="" className="hidden h-6 w-auto dark:block" />
        </Link>
      </div>
    </motion.footer>
  );
}
