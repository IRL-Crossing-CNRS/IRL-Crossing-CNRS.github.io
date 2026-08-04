import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoDark from '../assets/logo/crossing-wordmark-dark.png';
import logoLight from '../assets/logo/crossing-wordmark-light.png';
import { useSectionNavItems } from '../context/SectionNavContext';
import { useActiveSection } from '../hooks/useActiveSection';
import { EASE_REFINED } from '../lib/motion';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from './icons';
import ThemeToggle from './ThemeToggle';

const EXTERNAL_LINKS = [
  { href: 'https://crossing.cnrs.fr/', label: 'Official IRL CROSSING CNRS website', icon: Globe },
  { href: 'https://github.com/IRL-Crossing-CNRS', label: 'GitHub organization', icon: GithubIcon },
  { href: 'https://www.youtube.com/@IRL_Crossing', label: 'Youtube channel', icon: YoutubeIcon },
  { href: 'https://www.linkedin.com/in/irl-crossing-b27557281/', label: 'LinkedIn', icon: LinkedinIcon },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const sectionItems = useSectionNavItems();
  const activeSection = useActiveSection(sectionItems.map((item) => item.id));

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_REFINED }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || menuOpen ? 'glass border-border' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="IRL CROSSING - Resources"
          onClick={() => setMenuOpen(false)}
        >
          <img src={logoLight} alt="" className="block h-6 w-auto dark:hidden" />
          <img src={logoDark} alt="" className="hidden h-6 w-auto dark:block" />
        </Link>

        <nav className="hidden items-center gap-1.5 sm:flex sm:gap-2">
          {EXTERNAL_LINKS.map(({ href, label, icon: Icon }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              title={label}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15, ease: EASE_REFINED }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
            >
              <Icon size={16} />
            </motion.a>
          ))}
          <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
          <ThemeToggle />
        </nav>

        <motion.button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          whileTap={{ scale: 0.92 }}
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-accent-soft hover:text-accent sm:hidden"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_REFINED }}
            className="overflow-hidden border-t border-border sm:hidden"
          >
            <div className="mx-auto max-w-6xl px-6 py-4">
              {sectionItems.length > 0 && (
                <>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                    On this page
                  </p>
                  <ul className="mb-4 space-y-0.5">
                    {sectionItems.map(({ id, label }) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          onClick={() => setMenuOpen(false)}
                          className={`block rounded-lg px-2.5 py-2 text-sm transition-colors duration-200 ${
                            activeSection === id
                              ? 'bg-accent-soft font-medium text-accent'
                              : 'text-muted hover:text-foreground'
                          }`}
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-4 h-px bg-border" aria-hidden="true" />
                </>
              )}

              <ul className="mb-4 space-y-0.5">
                {EXTERNAL_LINKS.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted transition-colors duration-200 hover:text-foreground"
                    >
                      <Icon size={16} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between rounded-lg px-2.5 py-2">
                <span className="text-sm text-muted">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
