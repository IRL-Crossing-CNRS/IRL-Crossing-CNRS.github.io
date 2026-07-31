import { lazy } from 'react';

export const publicationPages: Record<string, ReturnType<typeof lazy>> = {
  'lotusim-iros2026': lazy(() => import('../pages/publications/lotusim-iros2026')),
};
