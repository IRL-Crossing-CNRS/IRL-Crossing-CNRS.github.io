import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavContextValue {
  items: SectionNavItem[];
  setItems: (items: SectionNavItem[]) => void;
}

const SectionNavContext = createContext<SectionNavContextValue | undefined>(undefined);

export function SectionNavProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SectionNavItem[]>([]);
  const value = useMemo(() => ({ items, setItems }), [items]);

  return <SectionNavContext.Provider value={value}>{children}</SectionNavContext.Provider>;
}

export function useSectionNavItems() {
  const context = useContext(SectionNavContext);
  if (!context) {
    throw new Error('useSectionNavItems must be used within a SectionNavProvider');
  }
  return context.items;
}

export function useRegisterSectionNav(items: SectionNavItem[]) {
  const context = useContext(SectionNavContext);
  if (!context) {
    throw new Error('useRegisterSectionNav must be used within a SectionNavProvider');
  }
  const { setItems } = context;

  useEffect(() => {
    setItems(items);
    return () => setItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setItems, JSON.stringify(items)]);
}
