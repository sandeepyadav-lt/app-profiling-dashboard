import { WidgetCard } from '../shared/WidgetCard';
import { Badge } from '../shared/Badge';
import { FilterPanel } from '../shared/FilterPanel';
import { useFilterPanel } from '../../hooks/useFilterPanel';
import { useStaggeredEntry } from '../../hooks/useStaggeredEntry';
import { useDashboard } from '../../context/DashboardContext';
import { deviceMatrixData } from '../../data/device-matrix-data';
import { getHeatmapStyle, type MetricType } from '../../utils/heatmap';
import type { WidgetInstanceProps } from '../../types/dashboard';
import styles from './DeviceMatrixWidget.module.css';

function MetricCell({ metric, value, formatted }: { metric: MetricType; value: number; formatted: string }) {
  const style = getHeatmapStyle(metric, value);
  return (
    <span className={styles.metricCell} style={style}>
      {formatted}
    </span>
  );
}

export function DeviceMatrixWidget({ instance, index }: WidgetInstanceProps) {
  const filterPanel = useFilterPanel();
  const staggerStyle = useStaggeredEntry(index);
  const { removeWidget, updateWidgetFilters, updateWidgetLabel } = useDashboard();

  return (
    <>
      <WidgetCard
        title={instance.label}
        badge={<Badge>{deviceMatrixData.length} devices</Badge>}
        fullSpan={instance.fullSpan}
        style={staggerStyle}
        onFilterClick={filterPanel.open}
        onRemove={() => removeWidget(instance.id)}
        onRename={(label) => updateWidgetLabel(instance.id, label)}
      >
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Device</th>
                <th>OS</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>FPS</th>
                <th>Crash Rate</th>
                <th>Sessions</th>
              </tr>
            </thead>
            <tbody>
              {deviceMatrixData.map((row) => (
                <tr key={row.device}>
                  <td className={styles.deviceName}>{row.device}</td>
                  <td className={styles.osVersion}>{row.os}</td>
                  <td>
                    <MetricCell metric="cpu" value={row.cpu} formatted={`${row.cpu}%`} />
                  </td>
                  <td>
                    <MetricCell metric="memory" value={row.memory} formatted={`${row.memory} MB`} />
                  </td>
                  <td>
                    <MetricCell metric="fps" value={row.fps} formatted={`${row.fps}`} />
                  </td>
                  <td>
                    <MetricCell metric="crashRate" value={row.crashRate} formatted={`${row.crashRate}%`} />
                  </td>
                  <td className={styles.sessions}>{row.sessions.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WidgetCard>
      <FilterPanel
        isOpen={filterPanel.isOpen}
        onClose={filterPanel.close}
        currentFilters={instance.filters}
        onApply={(filters) => updateWidgetFilters(instance.id, filters)}
      />
    </>
  );
}
