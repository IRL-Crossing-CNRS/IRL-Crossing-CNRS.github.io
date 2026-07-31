import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resourcePages } from '../../data/resourcePages';
import { EASE_REFINED } from '../../lib/motion';
import type { Resource } from '../../types/resource';
import TypeBadge from './TypeBadge';

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_REFINED } },
};

function getPrimaryHref(resource: Resource): string | undefined {
  return resource.resourceUrl ?? resource.pdfUrl ?? resource.arxivUrl ?? resource.repoUrl;
}

function ResourceRow({ resource }: { resource: Resource }) {
  const hasDetailPage = resource.slug in resourcePages;
  const primaryHref = getPrimaryHref(resource);
  const authorNames = resource.authors.map((author) => author.name).join(', ');

  const rowClasses =
    'group flex flex-col gap-2 px-4 py-4 transition-colors duration-200 hover:bg-accent-soft/40 sm:flex-row sm:items-center sm:gap-4 sm:px-5';

  const content = (
    <>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-sm font-medium text-foreground">{resource.title}</h3>
          {(hasDetailPage || primaryHref) && (
            <ArrowUpRight
              size={14}
              className="shrink-0 text-muted transition-colors duration-200 group-hover:text-accent"
            />
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-muted">{authorNames}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted sm:hidden">
          {resource.type.map((t) => (
            <TypeBadge key={t} type={t} size="xs" />
          ))}
          <span>{resource.venue}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{resource.year}</span>
        </div>
      </div>

      <div className="hidden shrink-0 flex-wrap gap-1.5 md:flex md:w-40">
        {resource.type.map((t) => (
          <TypeBadge key={t} type={t} size="xs" />
        ))}
      </div>

      <div className="hidden shrink-0 truncate text-xs text-muted lg:block lg:w-56">
        {resource.venue}
      </div>

      <div className="hidden shrink-0 text-xs text-muted sm:block sm:w-12 sm:text-right">
        {resource.year}
      </div>
    </>
  );

  if (hasDetailPage) {
    return (
      <motion.div variants={rowVariants}>
        <Link to={`/resources/${resource.slug}`} className={rowClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (primaryHref) {
    return (
      <motion.div variants={rowVariants}>
        <a href={primaryHref} target="_blank" rel="noreferrer noopener" className={rowClasses}>
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div variants={rowVariants}>
      <div className={rowClasses}>{content}</div>
    </motion.div>
  );
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export default function ResourceListView({ resources }: { resources: Resource[] }) {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="hidden items-center gap-4 border-b border-border px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted sm:flex">
        <span className="flex-1">Title</span>
        <span className="hidden w-40 md:block">Type</span>
        <span className="hidden w-56 lg:block">Venue</span>
        <span className="w-12 text-right">Year</span>
      </div>
      <div className="divide-y divide-border">
        {resources.map((resource) => (
          <ResourceRow key={resource.slug} resource={resource} />
        ))}
      </div>
    </motion.div>
  );
}
