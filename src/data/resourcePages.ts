import { lazy } from 'react';

export const resourcePages: Record<string, ReturnType<typeof lazy>> = {
  'lotusim-iros2026': lazy(() => import('../pages/resources/lotusim-iros2026')),
  'lotusim-energy-iros2026': lazy(() => import('../pages/resources/lotusim-energy-iros2026')),
  'robobreizh-robocup2023': lazy(() => import('../pages/resources/robobreizh-robocup2023')),
  'trustednews': lazy(() => import('../pages/resources/trustednews')),
};
