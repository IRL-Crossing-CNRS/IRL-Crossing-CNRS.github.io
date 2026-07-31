import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, FileText, Link as LinkIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { publicationPages } from '../data/publicationPages';
import { EASE_REFINED } from '../lib/motion';
import type { Publication } from '../types/publication';
import { GithubIcon } from './icons';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_REFINED } },
};

interface LinkItem {
  href?: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
}

export default function PublicationCard({ publication }: { publication: Publication }) {
  const { title, authors, year, venue, abstract, tags, pdfUrl, repoUrl, publicationUrl, featured } =
    publication;

  const allLinks: LinkItem[] = [
    { href: pdfUrl, label: 'PDF', icon: FileText },
    { href: repoUrl, label: 'Repository', icon: GithubIcon },
    { href: publicationUrl, label: 'Publication page', icon: LinkIcon },
  ];
  const links = allLinks.filter(
    (link): link is LinkItem & { href: string } => Boolean(link.href),
  );
  const hasDetailPage = publication.slug in publicationPages;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: EASE_REFINED }}
      className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 text-xs text-muted">
        <span>
          {venue} &middot; {year}
        </span>
        {featured && (
          <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent">Featured</span>
        )}
      </div>

      <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground">
        {hasDetailPage ? (
          <Link
            to={`/publications/${publication.slug}`}
            className="group inline-flex items-start gap-1 transition-colors duration-200 hover:text-accent"
          >
            {title}
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 text-muted transition-colors duration-200 group-hover:text-accent"
            />
          </Link>
        ) : (
          title
        )}
      </h3>

      <p className="text-sm text-muted">{authors.join(', ')}</p>

      <p className="flex-1 text-sm leading-relaxed text-muted">{abstract}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {(hasDetailPage || links.length > 0) && (
        <div className="border-t border-border pt-4">
          {hasDetailPage && (
            <Link
              to={`/publications/${publication.slug}`}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent"
            >
              Read publication
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          )}

          {links.length > 0 && (
            <div className={`flex items-center gap-3 text-xs text-muted ${hasDetailPage ? 'mt-3' : ''}`}>
              {links.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  title={label}
                  className="flex items-center gap-1.5 transition-colors duration-200 hover:text-accent"
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.article>
  );
}
