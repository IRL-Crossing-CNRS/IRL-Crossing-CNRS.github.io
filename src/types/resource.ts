export interface Author {
  name: string;
  url?: string;
  affiliations?: number[];
}

// Open-ended on purpose: only "paper" exists in the data today, but this
// shouldn't need a code change every time a new resource type shows up.
export type ResourceType = string;

export interface Resource {
  slug: string;
  title: string;
  project: string;
  type: ResourceType[];
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
}
