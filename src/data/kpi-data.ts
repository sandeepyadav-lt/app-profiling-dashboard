import type { KpiItem } from '../types/dashboard';

export const kpiData: KpiItem[] = [
  {
    label: 'Avg CPU Usage',
    value: '42.3',
    unit: '%',
    delta: -3.2,
    deltaLabel: 'vs prev period',
    trend: 'down',
    sentiment: 'positive',
  },
  {
    label: 'Avg Memory',
    value: '287',
    unit: 'MB',
    delta: 12,
    deltaLabel: 'vs prev period',
    trend: 'up',
    sentiment: 'negative',
  },
  {
    label: 'Avg FPS',
    value: '54.8',
    unit: 'fps',
    delta: 2.1,
    deltaLabel: 'vs prev period',
    trend: 'up',
    sentiment: 'positive',
  },
  {
    label: 'Crash Rate',
    value: '0.82',
    unit: '%',
    delta: -0.15,
    deltaLabel: 'vs prev period',
    trend: 'down',
    sentiment: 'positive',
  },
];
