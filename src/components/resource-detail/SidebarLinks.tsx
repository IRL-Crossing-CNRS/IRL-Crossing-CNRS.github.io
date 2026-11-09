import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';

interface LinkItem {
  href?: string;
  label: string;
  icon?: ComponentType<{ size?: number }>;
}

const LINK_CLASS =
  'flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:border-accent hover:text-accent';

export default function SidebarLinks({ links }: { links: LinkItem[] }) {
  const items = links.filter((link): link is LinkItem & { href: string } => Boolean(link.href));

  return (
    <div className="space-y-2">
      {items.map(({ href, label, icon: Icon = ExternalLinkIcon }) =>
        // Pages on this site open in the same tab; external links open in a new one.
        href.startsWith('/') ? (
          <Link key={label} to={href} className={LINK_CLASS}>
            <Icon size={14} />
            {label}
          </Link>
        ) : (
          <a key={label} href={href} target="_blank" rel="noreferrer noopener" className={LINK_CLASS}>
            <Icon size={14} />
            {label}
          </a>
        ),
      )}
    </div>
  );
}
