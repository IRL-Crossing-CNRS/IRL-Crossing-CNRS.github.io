import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects.json';
import resourcesData from '../data/resources.json';
import { EASE_REFINED } from '../lib/motion';
import type { Project } from '../types/project';
import type { Resource } from '../types/resource';

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function Projects() {
  const projects = projectsData as Project[];
  const resources = resourcesData as Resource[];

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
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            resources={resources.filter((r) => r.project === project.slug)}
          />
        ))}
      </motion.div>
    </div>
  );
}
