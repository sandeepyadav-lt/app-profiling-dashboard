import { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useDashboard } from '../../context/DashboardContext';
import { SortableWidget } from './SortableWidget';
import { AppPerformanceOverview } from '../widgets/AppPerformanceOverview';
import { PerformanceTrendsWidget } from '../widgets/PerformanceTrendsWidget';
import { DeviceMatrixWidget } from '../widgets/DeviceMatrixWidget';
import { FlowPerformanceWidget } from '../widgets/FlowPerformanceWidget';
import { SlaComplianceWidget } from '../widgets/SlaComplianceWidget';
import { CpuUsageWidget } from '../widgets/CpuUsageWidget';
import { MemoryUsageWidget } from '../widgets/MemoryUsageWidget';
import { PlusIcon } from '../shared/icons';
import type { WidgetInstance, WidgetInstanceProps } from '../../types/dashboard';
import type { ComponentType } from 'react';
import styles from './WidgetRenderer.module.css';

const widgetComponents: Record<string, ComponentType<WidgetInstanceProps>> = {
  'performance-overview': AppPerformanceOverview,
  'performance-trends': PerformanceTrendsWidget,
  'device-matrix': DeviceMatrixWidget,
  'flow-performance': FlowPerformanceWidget,
  'sla-compliance': SlaComplianceWidget,
  'cpu-usage': CpuUsageWidget,
  'memory-usage': MemoryUsageWidget,
};

interface WidgetRendererProps {
  onAddWidget: () => void;
}

export function WidgetRenderer({ onAddWidget }: WidgetRendererProps) {
  const { widgets, reorderWidgets } = useDashboard();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor),
  );

  const widgetIds = useMemo(() => widgets.map((w) => w.id), [widgets]);

  const activeWidget = activeId ? widgets.find((w) => w.id === activeId) : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderWidgets(String(active.id), String(over.id));
    }
    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  if (widgets.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No widgets on your dashboard yet.</p>
        <button className={styles.emptyBtn} onClick={onAddWidget}>
          <PlusIcon size={14} />
          Add Widget
        </button>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={widgetIds} strategy={rectSortingStrategy}>
        {widgets.map((widget: WidgetInstance, idx: number) => {
          const Component = widgetComponents[widget.type];
          if (!Component) return null;
          return (
            <SortableWidget key={widget.id} id={widget.id} fullSpan={widget.fullSpan}>
              <Component instance={widget} index={idx} />
            </SortableWidget>
          );
        })}
      </SortableContext>
      <DragOverlay>
        {activeWidget ? (() => {
          const Component = widgetComponents[activeWidget.type];
          if (!Component) return null;
          const idx = widgets.findIndex((w) => w.id === activeWidget.id);
          return <Component instance={activeWidget} index={idx} />;
        })() : null}
      </DragOverlay>
    </DndContext>
  );
}
