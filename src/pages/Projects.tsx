import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import { useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectToolbar, { type ProjectSortOption } from '../components/project-list/ProjectToolbar';
import projectsData from '../data/projects.json';
import resourcesData from '../data/resources.json';
import { EASE_REFINED } from '../lib/motion';
import { resourceMatchesQuery } from '../lib/resourceSearch';
import type { Project } from '../types/project';
import type { Resource } from '../types/resource';

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function Projects() {
  const projects = projectsData as Project[];
  const resources = resourcesData as Resource[];

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<ProjectSortOption>('name');

  const entries = useMemo(() => {
    const normalizedQuery = query.trim();

    return projects.map((project) => {
      const projectResources = resources.filter((r) => r.project === project.slug);
      const projectFieldsMatch =
        !normalizedQuery ||
        `${project.name} ${project.description}`.toLowerCase().includes(normalizedQuery.toLowerCase());
      const matchedResources = normalizedQuery
        ? projectResources.filter((r) => resourceMatchesQuery(r, normalizedQuery))
        : [];

      return {
        project,
        resources: projectResources,
        matchedResources,
        matches: !normalizedQuery || projectFieldsMatch || matchedResources.length > 0,
      };
    });
  }, [projects, resources, query]);

  const filtered = useMemo(() => {
    return entries
      .filter((entry) => entry.matches)
      .sort((a, b) => {
        if (sortBy === 'resources') return b.resources.length - a.resources.length;
        return a.project.name.localeCompare(b.project.name);
      });
  }, [entries, sortBy]);

  const hasActiveFilters = query.trim() !== '';

  const clearFilters = () => setQuery('');

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_REFINED }}
        className="mb-10 max-w-2xl"
      >
        <span className="glass inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted">
          {projects.length} project{projects.length === 1 ? '' : 's'}, {resources.length} resource
          {resources.length === 1 ? '' : 's'} total
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          A running index of research projects from IRL CROSSING CNRS, the French-Australian
          laboratory for humans-autonomous agents teaming. Each project groups the resources -
          papers, datasets, tools - that it has produced.
        </p>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE_REFINED }}
        className="mb-8"
      >
        <ProjectToolbar
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={filtered.length}
          totalCount={projects.length}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </motion.div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE_REFINED }}
          className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-20 text-center"
        >
          <SearchX size={26} className="text-muted" />
          <p className="text-sm font-medium text-foreground">No projects match your search</p>
          <p className="max-w-sm text-sm text-muted">
            Try a different search term, or clear your filters to see everything again.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-2 rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-foreground transition-opacity duration-200 hover:opacity-90"
          >
            Clear filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map(({ project, resources: projectResources, matchedResources }) => (
            <ProjectCard
              key={project.slug}
              project={project}
              resources={projectResources}
              matchedResources={matchedResources}
              query={query}
              onTagClick={setQuery}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
