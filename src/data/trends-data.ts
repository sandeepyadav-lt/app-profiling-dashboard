import type { TrendLine } from '../types/dashboard';
import { chartColors } from '../utils/chart-colors';

export const trendLabels = [
  'Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7',
  'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14',
  'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19', 'Jan 20', 'Jan 21',
  'Jan 22', 'Jan 23', 'Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28',
  'Jan 29', 'Jan 30',
];

export const trendLines: TrendLine[] = [
  {
    id: 'cpu',
    label: 'CPU Usage',
    color: chartColors.blue,
    unit: '%',
    yAxisID: 'y',
    visible: true,
    data: [38, 42, 35, 48, 52, 45, 39, 44, 58, 62, 55, 47, 42, 38, 45, 51, 48, 43, 39, 36, 41, 45, 50, 54, 48, 42, 37, 33, 40, 44],
  },
  {
    id: 'memory',
    label: 'Memory',
    color: chartColors.purple,
    unit: 'MB',
    yAxisID: 'y1',
    visible: true,
    data: [245, 258, 232, 278, 295, 268, 252, 285, 342, 388, 365, 318, 295, 272, 289, 312, 298, 275, 258, 242, 265, 288, 310, 335, 308, 282, 255, 238, 268, 290],
  },
  {
    id: 'fps',
    label: 'FPS',
    color: chartColors.green,
    unit: 'fps',
    yAxisID: 'y',
    visible: false,
    data: [58, 56, 59, 52, 49, 54, 57, 55, 45, 42, 47, 53, 56, 58, 54, 50, 52, 55, 57, 59, 56, 54, 51, 48, 52, 55, 58, 60, 56, 54],
  },
  {
    id: 'crashRate',
    label: 'Crash Rate',
    color: chartColors.red,
    unit: '%',
    yAxisID: 'y',
    visible: false,
    data: [0.9, 0.85, 0.92, 1.1, 1.2, 0.95, 0.88, 0.92, 1.4, 1.6, 1.3, 1.0, 0.88, 0.82, 0.9, 1.05, 0.95, 0.85, 0.8, 0.75, 0.82, 0.88, 0.98, 1.1, 0.95, 0.85, 0.78, 0.72, 0.84, 0.9],
  },
];
