import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resourcePages } from '../data/resourcePages';
import { EASE_REFINED } from '../lib/motion';
import type { Project } from '../types/project';
import type { Resource } from '../types/resource';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_REFINED } },
};

function getResourceHref(resource: Resource): string | undefined {
  if (resource.slug in resourcePages) return `/resources/${resource.slug}`;
  return resource.resourceUrl ?? resource.pdfUrl ?? resource.arxivUrl ?? resource.repoUrl;
}

export default function ProjectCard({
  project,
  resources,
  matchedResources = [],
  query = '',
  onTagClick,
}: {
  project: Project;
  resources: Resource[];
  matchedResources?: Resource[];
  query?: string;
  onTagClick?: (tag: string) => void;
}) {
  const tags = Array.from(new Set(resources.flatMap((r) => r.tags)));
  const projectHref = query.trim()
    ? `/projects/${project.slug}?q=${encodeURIComponent(query.trim())}`
    : `/projects/${project.slug}`;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: EASE_REFINED }}
      className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm"
    >
      <span className="text-xs text-muted">
        {resources.length} resource{resources.length === 1 ? '' : 's'}
      </span>

      <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground">
        <Link
          to={projectHref}
          className="group inline-flex items-start gap-1 transition-colors duration-200 hover:text-accent"
        >
          {project.name}
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-muted transition-colors duration-200 group-hover:text-accent"
          />
        </Link>
      </h3>

      <p className="flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) =>
            onTagClick ? (
              <button
                key={tag}
                type="button"
                onClick={() => onTagClick(tag)}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
              >
                {tag}
              </button>
            ) : (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      )}

      {matchedResources.length > 0 && (
        <div className="flex flex-col gap-1.5 rounded-xl bg-accent-soft/40 p-3">
          <span className="text-xs font-medium text-muted">Matching resources</span>
          {matchedResources.slice(0, 3).map((resource) => {
            const href = getResourceHref(resource);
            const isInternal = href?.startsWith('/resources/');
            const linkClasses =
              'group inline-flex items-start gap-1 text-sm text-foreground transition-colors duration-200 hover:text-accent';

            if (!href) {
              return (
                <span key={resource.slug} className="text-sm text-muted">
                  {resource.title}
                </span>
              );
            }

            return isInternal ? (
              <Link key={resource.slug} to={href} className={linkClasses}>
                {resource.title}
                <ArrowUpRight size={13} className="mt-0.5 shrink-0" />
              </Link>
            ) : (
              <a
                key={resource.slug}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className={linkClasses}
              >
                {resource.title}
                <ArrowUpRight size={13} className="mt-0.5 shrink-0" />
              </a>
            );
          })}
          {matchedResources.length > 3 && (
            <span className="text-xs text-muted">+{matchedResources.length - 3} more</span>
          )}
        </div>
      )}

      <div className="border-t border-border pt-4">
        <Link
          to={projectHref}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          View resources
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
