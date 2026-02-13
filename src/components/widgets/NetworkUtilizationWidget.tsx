import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { WidgetCard } from '../shared/WidgetCard';
import { StatsRow } from '../shared/StatsRow';
import { FilterPanel } from '../shared/FilterPanel';
import { useFilterPanel } from '../../hooks/useFilterPanel';
import { useStaggeredEntry } from '../../hooks/useStaggeredEntry';
import { useDashboard } from '../../context/DashboardContext';
import { networkDownloadData, networkUploadData, networkDownloadStats } from '../../data/network-utilization-data';
import { chartColors, withAlpha } from '../../utils/chart-colors';
import { baseLineOptions } from '../../utils/chart-defaults';
import type { WidgetInstanceProps } from '../../types/dashboard';
import type { ChartOptions } from 'chart.js';
import styles from './NetworkUtilizationWidget.module.css';

const labels = networkDownloadData.map((d) => d.label);
const downloadValues = networkDownloadData.map((d) => d.value);
const uploadValues = networkUploadData.map((d) => d.value);

const chartData = {
  labels,
  datasets: [
    {
      label: 'Network Download (KB)',
      data: downloadValues,
      borderColor: chartColors.green,
      backgroundColor: withAlpha(chartColors.green, 0.08),
      fill: true,
      yAxisID: 'y',
    },
    {
      label: 'Network Upload (KB)',
      data: uploadValues,
      borderColor: chartColors.blue,
      backgroundColor: withAlpha(chartColors.blue, 0.08),
      fill: true,
      yAxisID: 'y1',
    },
  ],
};

const options: ChartOptions<'line'> = {
  ...baseLineOptions,
  scales: {
    ...baseLineOptions.scales,
    y: {
      ...baseLineOptions.scales?.y,
      position: 'left',
      min: 0,
      max: 1.0,
      ticks: {
        ...((baseLineOptions.scales?.y && 'ticks' in baseLineOptions.scales.y) ? baseLineOptions.scales.y.ticks : {}),
        callback: (val) => `${val}`,
      },
      title: { display: true, text: 'Network Upload (KB)' },
    },
    y1: {
      position: 'right',
      min: 0,
      max: 100,
      grid: { drawOnChartArea: false },
      ticks: {
        callback: (val) => `${val}`,
      },
      title: { display: true, text: 'Network Download (KB)' },
    },
  },
  plugins: {
    ...baseLineOptions.plugins,
    legend: { display: true },
  },
};

export function NetworkUtilizationWidget({ instance, index }: WidgetInstanceProps) {
  const filterPanel = useFilterPanel();
  const staggerStyle = useStaggeredEntry(index);
  const { removeWidget, updateWidgetFilters, updateWidgetLabel } = useDashboard();

  const memoOptions = useMemo(() => options, []);

  return (
    <>
      <WidgetCard
        title={instance.label}
        fullSpan={instance.fullSpan}
        style={staggerStyle}
        onFilterClick={filterPanel.open}
        onRemove={() => removeWidget(instance.id)}
        onRename={(label) => updateWidgetLabel(instance.id, label)}
      >
        <div className={styles.chartContainer}>
          <Line data={chartData} options={memoOptions} />
        </div>
        <StatsRow stats={networkDownloadStats} />
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
