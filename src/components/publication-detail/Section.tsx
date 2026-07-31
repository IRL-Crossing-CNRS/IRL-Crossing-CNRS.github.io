import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE_REFINED } from '../../lib/motion';

export default function Section({
  id,
  title,
  children,
  noDivider = false,
}: {
  id: string;
  title: string;
  children: ReactNode;
  noDivider?: boolean;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: EASE_REFINED }}
      className={`scroll-mt-32 py-14 ${noDivider ? 'pt-0' : 'border-t border-border'}`}
    >
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      <div className="mt-6 space-y-6 text-justify text-base leading-relaxed text-muted">{children}</div>
    </motion.section>
  );
}
