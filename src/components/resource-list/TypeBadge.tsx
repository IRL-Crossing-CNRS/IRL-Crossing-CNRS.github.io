import { getResourceTypeConfig } from '../../data/resourceTypes';
import type { ResourceType } from '../../types/resource';

export default function TypeBadge({
  type,
  size = 'sm',
}: {
  type: ResourceType;
  size?: 'xs' | 'sm';
}) {
  const { label, icon: Icon } = getResourceTypeConfig(type);
  const sizeClasses =
    size === 'xs' ? 'gap-1 px-2 py-0.5 text-[11px]' : 'gap-1 px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full bg-accent-soft font-medium text-accent ${sizeClasses}`}
    >
      <Icon size={size === 'xs' ? 10 : 12} />
      {label}
    </span>
  );
}
