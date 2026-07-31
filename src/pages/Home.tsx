import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import ResourceListView from '../components/resource-list/ResourceListView';
import ResourceToolbar, {
  type SortOption,
  type ViewMode,
} from '../components/resource-list/ResourceToolbar';
import resourcesData from '../data/resources.json';
import { EASE_REFINED } from '../lib/motion';
import type { Resource, ResourceType } from '../types/resource';

const VIEW_STORAGE_KEY = 'irl-crossing-resource-view';

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

function getInitialView(): ViewMode {
  if (typeof window === 'undefined') return 'grid';
  return window.localStorage.getItem(VIEW_STORAGE_KEY) === 'list' ? 'list' : 'grid';
}

export default function Home() {
  const resources = resourcesData as Resource[];

  const [query, setQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [view, setView] = useState<ViewMode>(getInitialView);

  useEffect(() => {
    window.localStorage.setItem(VIEW_STORAGE_KEY, view);
  }, [view]);

  const availableTypes = useMemo(
    () => Array.from(new Set(resources.flatMap((r) => r.type))).sort(),
    [resources],
  );

  const typeCounts = useMemo(() => {
    const counts: Partial<Record<ResourceType, number>> = {};
    for (const resource of resources) {
      for (const type of resource.type) {
        counts[type] = (counts[type] ?? 0) + 1;
      }
    }
    return counts;
  }, [resources]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matches = resources.filter((resource) => {
      if (selectedTypes.length > 0 && !resource.type.some((type) => selectedTypes.includes(type))) {
        return false;
      }
      if (!normalizedQuery) return true;

      const haystack = [
        resource.title,
        resource.abstract,
        resource.venue,
        ...resource.tags,
        ...resource.authors.map((author) => author.name),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });

    return matches.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'oldest') return a.year - b.year;
      return b.year - a.year;
    });
  }, [resources, query, selectedTypes, sortBy]);

  const hasActiveFilters = query.trim() !== '' || selectedTypes.length > 0;

  const toggleType = (type: ResourceType) => {
    setSelectedTypes((current) =>
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type],
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedTypes([]);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_REFINED }}
        className="mb-10 max-w-2xl"
      >
        <span className="glass inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted">
          {resources.length} resource{resources.length === 1 ? '' : 's'} indexed
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Resources
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          A running index of research outputs from IRL CROSSING CNRS, the French-Australian
          laboratory for humans-autonomous agents teaming. Each entry summarizes a resource and
          links out to the full paper, code, and data.
        </p>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE_REFINED }}
        className="mb-8"
      >
        <ResourceToolbar
          query={query}
          onQueryChange={setQuery}
          availableTypes={availableTypes}
          typeCounts={typeCounts}
          selectedTypes={selectedTypes}
          onToggleType={toggleType}
          sortBy={sortBy}
          onSortChange={setSortBy}
          view={view}
          onViewChange={setView}
          resultCount={filtered.length}
          totalCount={resources.length}
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
          <p className="text-sm font-medium text-foreground">No resources match your filters</p>
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
      ) : view === 'grid' ? (
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </motion.div>
      ) : (
        <ResourceListView resources={filtered} />
      )}
    </div>
  );
}
