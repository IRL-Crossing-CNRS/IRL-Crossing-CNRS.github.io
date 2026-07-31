import { useActiveSection } from '../../hooks/useActiveSection';

interface NavItem {
  id: string;
  label: string;
}

export default function TableOfContents({ items }: { items: NavItem[] }) {
  const active = useActiveSection(items.map((item) => item.id));

  return (
    <ul className="space-y-0.5 border-l border-border">
      {items.map(({ id, label }) => (
        <li key={id} className="-ml-px">
          <a
            href={`#${id}`}
            className={`block border-l-2 py-1.5 pl-4 text-sm transition-colors duration-200 ${
              active === id
                ? 'border-accent font-medium text-accent'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
