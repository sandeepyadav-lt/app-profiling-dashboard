import { useDashboard } from '../../context/DashboardContext';
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
  const { widgets } = useDashboard();

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
    <>
      {widgets.map((widget: WidgetInstance, idx: number) => {
        const Component = widgetComponents[widget.type];
        if (!Component) return null;
        return <Component key={widget.id} instance={widget} index={idx} />;
      })}
    </>
  );
}
