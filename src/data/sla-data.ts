export interface SlaRule {
  id: string;
  metric: string;
  condition: string;
  threshold: string;
  currentValue: string;
  status: 'ok' | 'warning' | 'critical';
  breachCount: number;
  lastBreached: string | null;
}

export const slaRules: SlaRule[] = [
  {
    id: 'cpu_critical',
    metric: 'CPU Usage',
    condition: 'Avg > 70%',
    threshold: '70%',
    currentValue: '42.3%',
    status: 'ok',
    breachCount: 0,
    lastBreached: null,
  },
  {
    id: 'memory_warning',
    metric: 'Memory Usage',
    condition: 'Avg > 350 MB',
    threshold: '350 MB',
    currentValue: '287 MB',
    status: 'ok',
    breachCount: 2,
    lastBreached: 'Jan 10',
  },
  {
    id: 'fps_warning',
    metric: 'FPS',
    condition: 'Avg < 45 fps',
    threshold: '45 fps',
    currentValue: '54.8 fps',
    status: 'ok',
    breachCount: 1,
    lastBreached: 'Jan 9',
  },
  {
    id: 'crash_critical',
    metric: 'Crash Rate',
    condition: '> 1.5%',
    threshold: '1.5%',
    currentValue: '0.82%',
    status: 'ok',
    breachCount: 1,
    lastBreached: 'Jan 10',
  },
  {
    id: 'flow_checkout',
    metric: 'Checkout → Payment',
    condition: 'Duration > 3.0s',
    threshold: '3.0s',
    currentValue: '3.8s',
    status: 'critical',
    breachCount: 18,
    lastBreached: 'Jan 30',
  },
  {
    id: 'flow_search',
    metric: 'Search → Results',
    condition: 'Duration > 3.0s',
    threshold: '3.0s',
    currentValue: '3.2s',
    status: 'warning',
    breachCount: 8,
    lastBreached: 'Jan 28',
  },
  {
    id: 'cpu_device_a54',
    metric: 'CPU (Galaxy A54)',
    condition: 'Avg > 60%',
    threshold: '60%',
    currentValue: '62.4%',
    status: 'critical',
    breachCount: 22,
    lastBreached: 'Jan 30',
  },
  {
    id: 'crash_iphone13',
    metric: 'Crash Rate (iPhone 13)',
    condition: '> 1.0%',
    threshold: '1.0%',
    currentValue: '1.2%',
    status: 'warning',
    breachCount: 5,
    lastBreached: 'Jan 27',
  },
];

export const slaSummary = {
  total: 8,
  ok: 4,
  warning: 2,
  critical: 2,
};
