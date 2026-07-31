export interface Author {
  name: string;
  url?: string;
  affiliations?: number[];
}

export interface Resource {
  slug: string;
  title: string;
  authors: Author[];
  affiliations?: string[];
  year: number;
  venue: string;
  abstract: string;
  tags: string[];
  image?: string;
  pdfUrl?: string;
  repoUrl?: string;
  resourceUrl?: string;
  arxivUrl?: string;
  featured?: boolean;
}
