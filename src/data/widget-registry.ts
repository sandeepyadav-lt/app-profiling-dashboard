import type { WidgetType } from '../types/dashboard';

export interface WidgetMeta {
  type: WidgetType;
  label: string;
  description: string;
  defaultFullSpan: boolean;
}

export const widgetRegistry: WidgetMeta[] = [
  {
    type: 'performance-overview',
    label: 'Performance Overview',
    description: 'KPI cards for CPU, Memory, FPS, and Crash Rate',
    defaultFullSpan: true,
  },
  {
    type: 'performance-trends',
    label: 'Performance Trends',
    description: 'Multi-line chart of performance metrics over time',
    defaultFullSpan: true,
  },
  {
    type: 'device-matrix',
    label: 'Device Performance Matrix',
    description: 'Table view of per-device performance metrics',
    defaultFullSpan: true,
  },
  {
    type: 'flow-performance',
    label: 'Flow Performance',
    description: 'Horizontal bar chart of user flow durations vs SLA',
    defaultFullSpan: true,
  },
  {
    type: 'sla-compliance',
    label: 'SLA Compliance',
    description: 'SLA rules table with status and breach tracking',
    defaultFullSpan: true,
  },
  {
    type: 'cpu-usage',
    label: 'CPU Usage',
    description: 'Line chart with CPU usage stats',
    defaultFullSpan: false,
  },
  {
    type: 'memory-usage',
    label: 'Memory Usage',
    description: 'Line chart with memory usage stats',
    defaultFullSpan: false,
  },
];

export function getWidgetMeta(type: WidgetType): WidgetMeta {
  return widgetRegistry.find((w) => w.type === type)!;
}
