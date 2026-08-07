import { ArrowUpDown, ChevronDown, Search, X } from 'lucide-react';

export type ProjectSortOption = 'name' | 'resources';

interface ProjectToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  sortBy: ProjectSortOption;
  onSortChange: (value: ProjectSortOption) => void;
  resultCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function ProjectToolbar({
  query,
  onQueryChange,
  sortBy,
  onSortChange,
  resultCount,
  totalCount,
  hasActiveFilters,
  onClearFilters,
}: ProjectToolbarProps) {
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
            placeholder="Search projects, resources, or tags..."
            aria-label="Search projects"
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

        <div className="relative">
          <ArrowUpDown
            size={13}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as ProjectSortOption)}
            aria-label="Sort projects"
            className="appearance-none rounded-xl border border-border bg-surface/70 py-2.5 pl-8 pr-8 text-sm text-foreground transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="name">Name (A-Z)</option>
            <option value="resources">Most resources</option>
          </select>
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3 border-t border-border pt-4 text-xs text-muted">
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
  );
}
