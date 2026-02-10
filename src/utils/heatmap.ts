interface HeatmapThreshold {
  max: number;
  bg: string;
  fg: string;
  label: string;
}

const cpuThresholds: HeatmapThreshold[] = [
  { max: 40, bg: '#dcfce7', fg: '#16a34a', label: 'Good' },
  { max: 60, bg: '#fef9c3', fg: '#ca8a04', label: 'Moderate' },
  { max: 80, bg: '#ffedd5', fg: '#ea580c', label: 'High' },
  { max: 100, bg: '#fee2e2', fg: '#dc2626', label: 'Critical' },
];

const memoryThresholds: HeatmapThreshold[] = [
  { max: 250, bg: '#dcfce7', fg: '#16a34a', label: 'Good' },
  { max: 350, bg: '#fef9c3', fg: '#ca8a04', label: 'Moderate' },
  { max: 450, bg: '#ffedd5', fg: '#ea580c', label: 'High' },
  { max: 9999, bg: '#fee2e2', fg: '#dc2626', label: 'Critical' },
];

const fpsThresholds: HeatmapThreshold[] = [
  { max: 30, bg: '#fee2e2', fg: '#dc2626', label: 'Critical' },
  { max: 45, bg: '#ffedd5', fg: '#ea580c', label: 'Low' },
  { max: 55, bg: '#fef9c3', fg: '#ca8a04', label: 'Moderate' },
  { max: 999, bg: '#dcfce7', fg: '#16a34a', label: 'Good' },
];

const crashThresholds: HeatmapThreshold[] = [
  { max: 0.5, bg: '#dcfce7', fg: '#16a34a', label: 'Good' },
  { max: 1.0, bg: '#fef9c3', fg: '#ca8a04', label: 'Moderate' },
  { max: 2.0, bg: '#ffedd5', fg: '#ea580c', label: 'High' },
  { max: 100, bg: '#fee2e2', fg: '#dc2626', label: 'Critical' },
];

export type MetricType = 'cpu' | 'memory' | 'fps' | 'crashRate';

const thresholdMap: Record<MetricType, HeatmapThreshold[]> = {
  cpu: cpuThresholds,
  memory: memoryThresholds,
  fps: fpsThresholds,
  crashRate: crashThresholds,
};

export function getHeatmapStyle(metric: MetricType, value: number): { backgroundColor: string; color: string } {
  const thresholds = thresholdMap[metric];
  for (const t of thresholds) {
    if (value <= t.max) {
      return { backgroundColor: t.bg, color: t.fg };
    }
  }
  const last = thresholds[thresholds.length - 1];
  return { backgroundColor: last.bg, color: last.fg };
}
