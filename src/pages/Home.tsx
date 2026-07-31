import { motion } from 'framer-motion';
import ResourceCard from '../components/ResourceCard';
import resources from '../data/resources.json';
import type { Resource } from '../types/resource';

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export default function Home() {
  const items = resources as Resource[];
  const sorted = [...items].sort((a, b) => b.year - a.year);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 max-w-2xl"
      >
        <span className="glass inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted">
          {items.length} resource{items.length === 1 ? '' : 's'} indexed
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
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {sorted.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} />
        ))}
      </motion.div>
    </div>
  );
}
