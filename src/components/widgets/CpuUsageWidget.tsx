import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { WidgetCard } from '../shared/WidgetCard';
import { StatsRow } from '../shared/StatsRow';
import { CompareStatsTable } from '../shared/CompareStatsTable';
import { SegmentedControl } from '../shared/SegmentedControl';
import { FilterPanel } from '../shared/FilterPanel';
import { useFilterPanel } from '../../hooks/useFilterPanel';
import { useStaggeredEntry } from '../../hooks/useStaggeredEntry';
import { useDashboard } from '../../context/DashboardContext';
import { cpuChartData, cpuStats } from '../../data/cpu-data';
import { cpuDeviceChartData, cpuDeviceStats } from '../../data/cpu-device-data';
import { chartColors, withAlpha } from '../../utils/chart-colors';
import { baseLineOptions } from '../../utils/chart-defaults';
import { getThresholdAnnotations } from '../../utils/threshold-zones';
import { generateVariant, getCompareItems } from '../../utils/mock-variants';
import { computeStats } from '../../utils/stats';
import type { WidgetInstanceProps, CpuViewMode } from '../../types/dashboard';
import type { ChartOptions } from 'chart.js';
import styles from './CpuUsageWidget.module.css';

const appValues = cpuChartData.map((d) => d.value);
const deviceValues = cpuDeviceChartData.map((d) => d.value);
const labels = cpuChartData.map((d) => d.label);

const cpuViewOptions = [
  { value: 'app', label: 'App' },
  { value: 'device', label: 'Device' },
  { value: 'both', label: 'Both' },
];

const baseOptions: ChartOptions<'line'> = {
  ...baseLineOptions,
  scales: {
    ...baseLineOptions.scales,
    y: {
      ...baseLineOptions.scales?.y,
      min: 0,
      max: 100,
      ticks: {
        ...((baseLineOptions.scales?.y && 'ticks' in baseLineOptions.scales.y) ? baseLineOptions.scales.y.ticks : {}),
        callback: (val) => `${val}%`,
      },
    },
  },
  plugins: {
    ...baseLineOptions.plugins,
    annotation: {
      annotations: getThresholdAnnotations('cpu', 0, 100),
    },
  },
};

export function CpuUsageWidget({ instance, index }: WidgetInstanceProps) {
  const filterPanel = useFilterPanel();
  const staggerStyle = useStaggeredEntry(index);
  const { removeWidget, updateWidgetFilters, updateWidgetLabel, updateWidgetCpuViewMode } = useDashboard();

  const viewMode: CpuViewMode = instance.cpuViewMode ?? 'app';

  const compareItems = getCompareItems(instance);
  const isComparing = compareItems.length > 0;

  const chartData = useMemo(() => {
    if (isComparing) {
      const baseVals = viewMode === 'device' ? deviceValues : appValues;
      return {
        labels,
        datasets: compareItems.map((item) => ({
          label: item.label,
          data: generateVariant(baseVals, item.id),
          borderColor: item.color,
          backgroundColor: withAlpha(item.color, 0.08),
          fill: false,
        })),
      };
    }

    const datasets = [];
    if (viewMode === 'app' || viewMode === 'both') {
      datasets.push({
        label: 'App CPU',
        data: appValues,
        borderColor: chartColors.blue,
        backgroundColor: withAlpha(chartColors.blue, 0.08),
        fill: viewMode === 'app',
      });
    }
    if (viewMode === 'device' || viewMode === 'both') {
      datasets.push({
        label: 'Device CPU',
        data: deviceValues,
        borderColor: chartColors.orange,
        backgroundColor: withAlpha(chartColors.orange, 0.08),
        fill: viewMode === 'device',
      });
    }
    return { labels, datasets };
  }, [isComparing, compareItems, viewMode]);

  const chartOptions: ChartOptions<'line'> = useMemo(() => {
    const showLegend = isComparing || viewMode === 'both';
    return {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        legend: { display: showLegend },
      },
    };
  }, [isComparing, viewMode]);

  const activeStats = viewMode === 'device' ? cpuDeviceStats : cpuStats;

  return (
    <>
      <WidgetCard
        title={instance.label}
        fullSpan={instance.fullSpan}
        style={staggerStyle}
        onFilterClick={filterPanel.open}
        onRemove={() => removeWidget(instance.id)}
        onRename={(label) => updateWidgetLabel(instance.id, label)}
        headerActions={
          <SegmentedControl
            options={cpuViewOptions}
            value={viewMode}
            onChange={(v) => updateWidgetCpuViewMode(instance.id, v as CpuViewMode)}
          />
        }
      >
        <div className={styles.chartContainer}>
          <Line data={chartData} options={chartOptions} />
        </div>
        {isComparing ? (
          <CompareStatsTable
            columns={[{ label: 'CPU Usage', unit: '%' }]}
            rows={compareItems.map((item) => ({
              label: item.label,
              color: item.color,
              values: [computeStats(generateVariant(viewMode === 'device' ? deviceValues : appValues, item.id))],
            }))}
          />
        ) : (
          <StatsRow stats={activeStats} />
        )}
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
