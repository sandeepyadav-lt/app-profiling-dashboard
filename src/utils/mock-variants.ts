import { trendColors, withAlpha } from './chart-colors';
import { filterCategories } from '../data/filter-categories';
import type { WidgetInstance } from '../types/dashboard';

export function generateVariant(baseData: number[], seed: string, variance = 0.15): number[] {
  let hash = 0;
  for (const ch of seed) hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  return baseData.map((v, i) => {
    const noise = Math.sin(hash + i * 0.7) * variance;
    return Math.round(v * (1 + noise) * 100) / 100;
  });
}

export function getCompareColor(index: number): string {
  return trendColors[index % trendColors.length];
}

export function getCompareColorWithAlpha(index: number, alpha: number): string {
  return withAlpha(getCompareColor(index), alpha);
}

const dashPatterns: number[][] = [
  [],          // solid
  [6, 3],     // dashed
  [2, 2],     // dotted
  [8, 3, 2, 3], // dash-dot
  [12, 4],    // long dash
  [4, 4],     // medium dash
];

export function getCompareDash(index: number): number[] {
  return dashPatterns[index % dashPatterns.length];
}

export interface CompareItem {
  id: string;
  label: string;
  color: string;
  dash: number[];
}

export function getCompareItems(instance: WidgetInstance): CompareItem[] {
  const { compareCategory, selections } = instance.filters;
  if (!compareCategory) return [];

  const selected = selections[compareCategory];
  if (!selected || selected.length === 0) return [];

  const category = filterCategories.find((c) => c.id === compareCategory);
  if (!category) return [];

  return selected.map((optId, i) => {
    const opt = category.options.find((o) => o.id === optId);
    return {
      id: optId,
      label: opt?.label ?? optId,
      color: getCompareColor(i),
      dash: getCompareDash(i),
    };
  });
}
