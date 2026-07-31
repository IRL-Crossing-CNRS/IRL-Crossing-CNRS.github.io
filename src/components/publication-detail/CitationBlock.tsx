import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { EASE_REFINED } from '../../lib/motion';

export default function CitationBlock({ plain, bibtex }: { plain: string; bibtex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-muted">{plain}</p>
      <div className="relative rounded-xl border border-border bg-surface">
        <motion.button
          type="button"
          onClick={handleCopy}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.15, ease: EASE_REFINED }}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted transition-colors duration-200 hover:text-accent"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </motion.button>
        <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-muted sm:pt-5">
          <code>{bibtex}</code>
        </pre>
      </div>
    </div>
  );
}
