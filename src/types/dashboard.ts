export interface KpiItem {
  label: string;
  value: string;
  unit: string;
  delta: number;
  deltaLabel: string;
  trend: 'up' | 'down' | 'flat';
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface StatItem {
  label: string;
  value: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface TrendLine {
  id: string;
  label: string;
  color: string;
  unit: string;
  yAxisID: string;
  data: number[];
  visible: boolean;
}

export interface DeviceRow {
  device: string;
  os: string;
  cpu: number;
  memory: number;
  fps: number;
  crashRate: number;
  sessions: number;
}

export interface FlowItem {
  name: string;
  duration: number;
}

export interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

export interface FilterTag {
  id: string;
  label: string;
  category: string;
}

export type DateRange = '7d' | '14d' | '30d' | '90d';
export type Frequency = 'daily' | 'weekly' | 'monthly';

export type WidgetType =
  | 'performance-overview'
  | 'performance-trends'
  | 'device-matrix'
  | 'flow-performance'
  | 'sla-compliance'
  | 'cpu-usage'
  | 'memory-usage'
  | 'frame-rate'
  | 'battery-utilization'
  | 'network-utilization'
  | 'battery-temperature'
  | 'cold-startup'
  | 'hot-startup';

export type CpuViewMode = 'app' | 'device' | 'both';

export interface WidgetFilterState {
  selections: Record<string, string[]>;
  compareCategory?: string;
}

export interface WidgetInstance {
  id: string;
  type: WidgetType;
  label: string;
  filters: WidgetFilterState;
  kpiVisibility?: Record<string, boolean>;
  cpuViewMode?: CpuViewMode;
  fullSpan: boolean;
}

export interface GlobalFilterState {
  selections: Record<string, string[]>;
}

export interface WidgetInstanceProps {
  instance: WidgetInstance;
  index: number;
}
