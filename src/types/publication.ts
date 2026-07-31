export interface Publication {
  slug: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  abstract: string;
  tags: string[];
  image?: string;
  pdfUrl?: string;
  repoUrl?: string;
  publicationUrl?: string;
  featured?: boolean;
}
