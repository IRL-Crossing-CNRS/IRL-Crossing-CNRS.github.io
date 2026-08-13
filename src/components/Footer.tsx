import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE_REFINED } from '../lib/motion';
import logoDark from '../assets/logo/crossing-wordmark-dark.png';
import logoLight from '../assets/logo/crossing-wordmark-light.png';
import { Link } from 'react-router-dom';

const MAIN_SITE_URL = 'https://crossing.cnrs.fr/';

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
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-center text-sm text-muted sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p>&copy; {year} IRL CROSSING CNRS. All rights reserved.</p>
          <p>
            This site catalogs research resources from IRL CROSSING CNRS. For the lab's main
            website, visit{' '}
            <a
              href={MAIN_SITE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
            >
              crossing.cnrs.fr
              <ArrowUpRight size={12} />
            </a>
            .
          </p>
        </div>
        <Link to="/" className="flex items-center gap-3" aria-label="IRL CROSSING - Projects">
          <img src={logoLight} alt="" className="block h-6 w-auto dark:hidden" />
          <img src={logoDark} alt="" className="hidden h-6 w-auto dark:block" />
        </Link>
      </div>
    </motion.footer>
  );
}
