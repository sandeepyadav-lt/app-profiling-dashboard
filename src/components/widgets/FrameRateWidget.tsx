import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { WidgetCard } from '../shared/WidgetCard';
import { StatsRow } from '../shared/StatsRow';
import { FilterPanel } from '../shared/FilterPanel';
import { useFilterPanel } from '../../hooks/useFilterPanel';
import { useStaggeredEntry } from '../../hooks/useStaggeredEntry';
import { useDashboard } from '../../context/DashboardContext';
import { fpsData, jankyFramesData, frozenFramesData, fpsStats } from '../../data/frame-rate-data';
import { chartColors, withAlpha } from '../../utils/chart-colors';
import { baseLineOptions } from '../../utils/chart-defaults';
import type { WidgetInstanceProps } from '../../types/dashboard';
import type { ChartOptions } from 'chart.js';
import styles from './FrameRateWidget.module.css';

const labels = fpsData.map((d) => d.label);
const fpsValues = fpsData.map((d) => d.value);
const jankyValues = jankyFramesData.map((d) => d.value);
const frozenValues = frozenFramesData.map((d) => d.value);

const chartData = {
  labels,
  datasets: [
    {
      label: 'Current FPS',
      data: fpsValues,
      borderColor: chartColors.red,
      backgroundColor: withAlpha(chartColors.red, 0.08),
      fill: false,
      yAxisID: 'y',
    },
    {
      label: 'Janky Frames',
      data: jankyValues,
      borderColor: chartColors.yellow,
      backgroundColor: withAlpha(chartColors.yellow, 0.08),
      fill: false,
      yAxisID: 'y1',
    },
    {
      label: 'Frozen Frames',
      data: frozenValues,
      borderColor: chartColors.orange,
      backgroundColor: withAlpha(chartColors.orange, 0.08),
      fill: false,
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
      max: 120,
      ticks: {
        ...((baseLineOptions.scales?.y && 'ticks' in baseLineOptions.scales.y) ? baseLineOptions.scales.y.ticks : {}),
        callback: (val) => `${val}`,
      },
      title: { display: true, text: 'Current FPS' },
    },
    y1: {
      position: 'right',
      min: 0,
      max: 40,
      grid: { drawOnChartArea: false },
      ticks: {
        callback: (val) => `${val}`,
      },
      title: { display: true, text: 'Frames' },
    },
  },
  plugins: {
    ...baseLineOptions.plugins,
    legend: { display: true },
  },
};

export function FrameRateWidget({ instance, index }: WidgetInstanceProps) {
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
        <StatsRow stats={fpsStats} />
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
