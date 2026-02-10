export const chartColors = {
  blue: '#0969da',
  purple: '#8250df',
  cyan: '#0891b2',
  orange: '#f97316',
  green: '#16a34a',
  red: '#dc2626',
  pink: '#db2777',
  yellow: '#ca8a04',
  slaRed: '#dc2626',
} as const;

export function withAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const trendColors = [
  chartColors.blue,
  chartColors.purple,
  chartColors.orange,
  chartColors.green,
  chartColors.cyan,
  chartColors.pink,
];
