import type { ReactNode } from 'react';

export default function SidebarCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h2 className="text-xs font-medium uppercase tracking-wider text-muted">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
