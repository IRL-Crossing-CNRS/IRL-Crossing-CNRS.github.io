import { motion } from 'framer-motion';
import { ArrowUpDown, ChevronDown, LayoutGrid, List, Search, X } from 'lucide-react';
import { getResourceTypeConfig } from '../../data/resourceTypes';
import { EASE_REFINED } from '../../lib/motion';
import type { ResourceType } from '../../types/resource';

export type SortOption = 'newest' | 'oldest' | 'title';
export type ViewMode = 'grid' | 'list';

const VIEW_OPTIONS: { value: ViewMode; label: string; icon: typeof LayoutGrid }[] = [
  { value: 'grid', label: 'Grid', icon: LayoutGrid },
  { value: 'list', label: 'List', icon: List },
];

interface ResourceToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  availableTypes: ResourceType[];
  typeCounts: Partial<Record<ResourceType, number>>;
  selectedTypes: ResourceType[];
  onToggleType: (type: ResourceType) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  view: ViewMode;
  onViewChange: (value: ViewMode) => void;
  resultCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function ResourceToolbar({
  query,
  onQueryChange,
  availableTypes,
  typeCounts,
  selectedTypes,
  onToggleType,
  sortBy,
  onSortChange,
  view,
  onViewChange,
  resultCount,
  totalCount,
  hasActiveFilters,
  onClearFilters,
}: ResourceToolbarProps) {
  return (
    <div className="glass rounded-2xl border border-border p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by title, author, or tag..."
            aria-label="Search resources"
            className="w-full rounded-xl border border-border bg-surface/70 py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          {query !== '' && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors duration-200 hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <ArrowUpDown
              size={13}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as SortOption)}
              aria-label="Sort resources"
              className="appearance-none rounded-xl border border-border bg-surface/70 py-2.5 pl-8 pr-8 text-sm text-foreground transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title">Title (A-Z)</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>

          <div className="relative inline-flex items-center gap-0.5 rounded-xl border border-border bg-surface/70 p-1">
            {VIEW_OPTIONS.map(({ value, label, icon: Icon }) => {
              const active = view === value;
              return (
                <motion.button
                  key={value}
                  type="button"
                  onClick={() => onViewChange(value)}
                  whileTap={{ scale: 0.94 }}
                  aria-pressed={active}
                  aria-label={`${label} view`}
                  title={`${label} view`}
                  className="relative flex h-8 items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-medium"
                >
                  {active && (
                    <motion.span
                      layoutId="resource-view-toggle"
                      transition={{ duration: 0.25, ease: EASE_REFINED }}
                      className="absolute inset-0 rounded-lg bg-accent"
                    />
                  )}
                  <Icon
                    size={14}
                    className={`relative transition-colors duration-200 ${active ? 'text-accent-foreground' : 'text-muted'}`}
                  />
                  <span
                    className={`relative hidden transition-colors duration-200 sm:inline ${active ? 'text-accent-foreground' : 'text-muted'}`}
                  >
                    {label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {availableTypes.length > 0 && (
        <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {availableTypes.map((type) => {
              const { label, icon: Icon } = getResourceTypeConfig(type);
              const active = selectedTypes.includes(type);
              return (
                <motion.button
                  key={type}
                  type="button"
                  onClick={() => onToggleType(type)}
                  whileTap={{ scale: 0.96 }}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                    active
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border text-muted hover:border-accent/50 hover:text-foreground'
                  }`}
                >
                  <Icon size={13} />
                  {label}
                  <span className={active ? 'text-accent-foreground/70' : 'text-muted/70'}>
                    {typeCounts[type] ?? 0}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 whitespace-nowrap text-xs text-muted">
            <span>
              {resultCount} of {totalCount} shown
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="font-medium text-accent transition-opacity duration-200 hover:opacity-80"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
