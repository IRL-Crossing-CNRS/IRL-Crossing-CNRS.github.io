import projectsData from '../data/projects.json';
import resourcesData from '../data/resources.json';
import type { Project } from '../types/project';
import type { Resource } from '../types/resource';

const projects = projectsData as Project[];
const resources = resourcesData as Resource[];

export function getProject(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project slug: ${slug}`);
  return project;
}

export function getProjectResources(slug: string): Resource[] {
  return resources.filter((r) => r.project === slug);
}
