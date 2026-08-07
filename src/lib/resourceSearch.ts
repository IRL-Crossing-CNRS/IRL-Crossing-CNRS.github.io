import type { Resource } from '../types/resource';

export function resourceMatchesQuery(resource: Resource, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [
    resource.title,
    resource.abstract,
    resource.venue,
    ...resource.tags,
    ...resource.authors.map((author) => author.name),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(normalized);
}
