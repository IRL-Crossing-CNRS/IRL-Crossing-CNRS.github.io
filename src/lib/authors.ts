import authorUrls from '../data/authors.json';

export function getAuthorUrl(name: string): string | undefined {
  return (authorUrls as Record<string, string>)[name];
}
