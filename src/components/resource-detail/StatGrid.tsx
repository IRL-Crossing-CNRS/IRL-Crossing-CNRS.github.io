interface Stat {
  value: string;
  label: string;
}

export default function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-surface p-4">
          <div className="text-2xl font-semibold tracking-tight text-accent">{stat.value}</div>
          <div className="mt-1 text-xs leading-relaxed text-muted">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
