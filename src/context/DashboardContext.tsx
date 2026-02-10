import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { DateRange, Frequency, WidgetInstance, WidgetFilterState, WidgetType } from '../types/dashboard';
import { getWidgetMeta } from '../data/widget-registry';

const STORAGE_KEY = 'atx-dashboard-config';

interface DashboardConfig {
  widgets: WidgetInstance[];
  dateRange: DateRange;
  frequency: Frequency;
}

interface DashboardContextValue {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  frequency: Frequency;
  setFrequency: (freq: Frequency) => void;
  widgets: WidgetInstance[];
  addWidget: (type: WidgetType) => void;
  removeWidget: (id: string) => void;
  updateWidgetFilters: (id: string, filters: WidgetFilterState) => void;
  updateWidgetKpiVisibility: (id: string, kpiVisibility: Record<string, boolean>) => void;
  updateWidgetLabel: (id: string, label: string) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

let nextId = 6;

function createWidgetInstance(type: WidgetType, id?: string, label?: string): WidgetInstance {
  const meta = getWidgetMeta(type);
  return {
    id: id ?? String(nextId++),
    type,
    label: label ?? meta.label,
    filters: { selections: {} },
    fullSpan: meta.defaultFullSpan,
  };
}

const defaultWidgets: WidgetInstance[] = [
  createWidgetInstance('performance-overview', '1', 'Performance Overview'),
  createWidgetInstance('performance-trends', '2', 'Performance Trends'),
  createWidgetInstance('device-matrix', '3', 'Device Performance Matrix'),
  createWidgetInstance('flow-performance', '4', 'Flow Performance'),
  createWidgetInstance('sla-compliance', '5', 'SLA Compliance'),
];

const validDateRanges: DateRange[] = ['7d', '14d', '30d', '90d'];
const validFrequencies: Frequency[] = ['daily', 'weekly', 'monthly'];

function loadConfig(): DashboardConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      !Array.isArray(parsed.widgets) ||
      !validDateRanges.includes(parsed.dateRange) ||
      !validFrequencies.includes(parsed.frequency)
    ) {
      return null;
    }
    return parsed as DashboardConfig;
  } catch {
    return null;
  }
}

function initState(): { widgets: WidgetInstance[]; dateRange: DateRange; frequency: Frequency } {
  const saved = loadConfig();
  if (saved) {
    nextId = Math.max(...saved.widgets.map((w) => Number(w.id) || 0), 5) + 1;
    return saved;
  }
  return { widgets: defaultWidgets, dateRange: '30d', frequency: 'daily' };
}

const initial = initState();

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange>(initial.dateRange);
  const [frequency, setFrequency] = useState<Frequency>(initial.frequency);
  const [widgets, setWidgets] = useState<WidgetInstance[]>(initial.widgets);

  useEffect(() => {
    const config: DashboardConfig = { widgets, dateRange, frequency };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [widgets, dateRange, frequency]);

  const addWidget = useCallback((type: WidgetType) => {
    setWidgets((prev) => [...prev, createWidgetInstance(type)]);
  }, []);

  const removeWidget = useCallback((id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const updateWidgetFilters = useCallback((id: string, filters: WidgetFilterState) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, filters } : w)),
    );
  }, []);

  const updateWidgetKpiVisibility = useCallback((id: string, kpiVisibility: Record<string, boolean>) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, kpiVisibility } : w)),
    );
  }, []);

  const updateWidgetLabel = useCallback((id: string, label: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, label } : w)),
    );
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dateRange, setDateRange,
        frequency, setFrequency,
        widgets, addWidget, removeWidget,
        updateWidgetFilters, updateWidgetKpiVisibility,
        updateWidgetLabel,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}
