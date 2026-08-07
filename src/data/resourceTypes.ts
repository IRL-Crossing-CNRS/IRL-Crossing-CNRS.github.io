import { FileText, FolderKanban, Tag } from 'lucide-react';
import type { ComponentType } from 'react';
import type { ResourceType } from '../types/resource';

// Only types that actually exist in resources.json belong here. Anything
// else falls back to a generic tag icon + capitalized label below.
const KNOWN_RESOURCE_TYPES: Record<string, { label: string; icon: ComponentType<{ size?: number }> }> = {
  paper: { label: 'Paper', icon: FileText },
  project: { label: 'Project', icon: FolderKanban },
};

export function getResourceTypeConfig(type: ResourceType) {
  return (
    KNOWN_RESOURCE_TYPES[type] ?? {
      label: type.charAt(0).toUpperCase() + type.slice(1),
      icon: Tag,
    }
  );
}
