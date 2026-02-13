import { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import type { WidgetFilterState } from '../types/dashboard';

/**
 * Merges global filters with per-widget filters.
 * Widget-level selections override global for the same category.
 */
export function useEffectiveFilters(widgetFilters: WidgetFilterState): WidgetFilterState {
  const { globalFilters } = useDashboard();

  return useMemo(() => {
    const merged: Record<string, string[]> = { ...globalFilters.selections };

    for (const [key, values] of Object.entries(widgetFilters.selections)) {
      if (values.length > 0) {
        merged[key] = values;
      }
    }

    return {
      selections: merged,
      compareCategory: widgetFilters.compareCategory,
    };
  }, [globalFilters, widgetFilters]);
}
