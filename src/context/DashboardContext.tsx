import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { DateRange, Frequency, WidgetInstance, WidgetFilterState, WidgetType, CpuViewMode, GlobalFilterState } from '../types/dashboard';
import { getWidgetMeta } from '../data/widget-registry';

const STORAGE_KEY = 'atx-dashboard-config-v2';

interface DashboardConfig {
  widgets: WidgetInstance[];
  dateRange: DateRange;
  frequency: Frequency;
  globalFilters: GlobalFilterState;
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
  reorderWidgets: (activeId: string, overId: string) => void;
  updateWidgetCpuViewMode: (id: string, mode: CpuViewMode) => void;
  globalFilters: GlobalFilterState;
  updateGlobalFilters: (filters: GlobalFilterState) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

let nextId = 9;

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
  createWidgetInstance('cpu-usage', '1', 'CPU Utilization Trend'),
  createWidgetInstance('frame-rate', '2', 'Frame Rate Trends'),
  createWidgetInstance('memory-usage', '3', 'Memory Usage'),
  createWidgetInstance('battery-utilization', '4', 'Battery Utilization'),
  createWidgetInstance('network-utilization', '5', 'Network Utilization'),
  createWidgetInstance('battery-temperature', '6', 'Battery Temperature'),
  createWidgetInstance('cold-startup', '7', 'Cold Startup Time'),
  createWidgetInstance('hot-startup', '8', 'Hot Startup Time'),
];

const validDateRanges: DateRange[] = ['7d', '14d', '30d', '90d'];
const validFrequencies: Frequency[] = ['daily', 'weekly', 'monthly'];

const defaultGlobalFilters: GlobalFilterState = { selections: {} };

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
    return {
      ...parsed,
      globalFilters: parsed.globalFilters ?? defaultGlobalFilters,
    } as DashboardConfig;
  } catch {
    return null;
  }
}

function initState(): { widgets: WidgetInstance[]; dateRange: DateRange; frequency: Frequency; globalFilters: GlobalFilterState } {
  const saved = loadConfig();
  if (saved) {
    nextId = Math.max(...saved.widgets.map((w) => Number(w.id) || 0), 5) + 1;
    return saved;
  }
  return { widgets: defaultWidgets, dateRange: '30d', frequency: 'daily', globalFilters: defaultGlobalFilters };
}

const initial = initState();

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange>(initial.dateRange);
  const [frequency, setFrequency] = useState<Frequency>(initial.frequency);
  const [widgets, setWidgets] = useState<WidgetInstance[]>(initial.widgets);
  const [globalFilters, setGlobalFilters] = useState<GlobalFilterState>(initial.globalFilters);

  useEffect(() => {
    const config: DashboardConfig = { widgets, dateRange, frequency, globalFilters };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [widgets, dateRange, frequency, globalFilters]);

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

  const reorderWidgets = useCallback((activeId: string, overId: string) => {
    setWidgets((prev) => {
      const oldIndex = prev.findIndex((w) => w.id === activeId);
      const newIndex = prev.findIndex((w) => w.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  const updateWidgetCpuViewMode = useCallback((id: string, cpuViewMode: CpuViewMode) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, cpuViewMode } : w)),
    );
  }, []);

  const updateGlobalFilters = useCallback((filters: GlobalFilterState) => {
    setGlobalFilters(filters);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dateRange, setDateRange,
        frequency, setFrequency,
        widgets, addWidget, removeWidget,
        updateWidgetFilters, updateWidgetKpiVisibility,
        updateWidgetLabel, reorderWidgets,
        updateWidgetCpuViewMode,
        globalFilters, updateGlobalFilters,
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
