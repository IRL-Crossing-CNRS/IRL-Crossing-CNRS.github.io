import type { ComponentType } from 'react';

interface LinkItem {
  href?: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
}

export default function SidebarLinks({ links }: { links: LinkItem[] }) {
  const items = links.filter((link): link is LinkItem & { href: string } => Boolean(link.href));

  return (
    <div className="space-y-2">
      {items.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <Icon size={14} />
          {label}
        </a>
      ))}
    </div>
  );
}
