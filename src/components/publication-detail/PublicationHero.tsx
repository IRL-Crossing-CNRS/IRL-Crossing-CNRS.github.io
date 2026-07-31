import { motion } from 'framer-motion';
import { ArrowLeft, FileText, PlayCircle } from 'lucide-react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { EASE_REFINED } from '../../lib/motion';
import { GithubIcon } from '../icons';

interface HeroLink {
  href?: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
}

export default function PublicationHero({
  eyebrow,
  title,
  authors,
  affiliations,
  pdfUrl,
  repoUrl,
  videoUrl,
}: {
  eyebrow: string;
  title: string;
  authors: string[];
  affiliations: string;
  pdfUrl?: string;
  repoUrl?: string;
  videoUrl?: string;
}) {
  const allLinks: HeroLink[] = [
    { href: pdfUrl, label: 'Paper (PDF)', icon: FileText },
    { href: videoUrl, label: 'Video', icon: PlayCircle },
    { href: repoUrl, label: 'Code', icon: GithubIcon },
  ];
  const links = allLinks.filter((link): link is HeroLink & { href: string } => Boolean(link.href));

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_REFINED }}
      className="max-w-3xl pb-14"
    >
      <div className="flex flex-row justify-start items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-accent"
        >
          <ArrowLeft size={14} />
          All publications
        </Link>

        <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted">
          {eyebrow}
        </span>
      </div>

      <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>

      <p className="mt-4 text-sm leading-relaxed text-muted">{authors.join(', ')}</p>
      <p className="mt-1 text-xs text-muted">{affiliations}</p>

      {links.length > 0 && (
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {links.map(({ href, label, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: EASE_REFINED }}
              className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Icon size={14} />
              {label}
            </motion.a>
          ))}
        </div>
      )}
    </motion.header>
  );
}
