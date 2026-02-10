import type { FlowItem } from '../types/dashboard';

export const flowData: FlowItem[] = [
  { name: 'App Launch → Home', duration: 2.4 },
  { name: 'Login → Dashboard', duration: 1.8 },
  { name: 'Search → Results', duration: 3.2 },
  { name: 'Cart → Checkout', duration: 2.9 },
  { name: 'Home → Product Detail', duration: 1.5 },
  { name: 'Checkout → Payment', duration: 3.8 },
  { name: 'Settings → Profile', duration: 1.1 },
  { name: 'Feed → Post Detail', duration: 2.1 },
];

export const slaThreshold = 3.0;
