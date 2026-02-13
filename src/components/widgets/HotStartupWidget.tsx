import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { WidgetCard } from '../shared/WidgetCard';
import { StatsRow } from '../shared/StatsRow';
import { CompareStatsTable } from '../shared/CompareStatsTable';
import { FilterPanel } from '../shared/FilterPanel';
import { useFilterPanel } from '../../hooks/useFilterPanel';
import { useStaggeredEntry } from '../../hooks/useStaggeredEntry';
import { useDashboard } from '../../context/DashboardContext';
import { hotStartupData, hotStartupStats } from '../../data/hot-startup-data';
import { chartColors, withAlpha } from '../../utils/chart-colors';
import { baseLineOptions } from '../../utils/chart-defaults';
import { generateVariant, getCompareItems } from '../../utils/mock-variants';
import { computeStats } from '../../utils/stats';
import type { WidgetInstanceProps } from '../../types/dashboard';
import type { ChartOptions } from 'chart.js';
import styles from './HotStartupWidget.module.css';

const baseValues = hotStartupData.map((d) => d.value);
const labels = hotStartupData.map((d) => d.label);

const defaultChartData = {
  labels,
  datasets: [
    {
      label: 'Hot Startup (ms)',
      data: baseValues,
      borderColor: chartColors.red,
      backgroundColor: withAlpha(chartColors.red, 0.08),
      fill: false,
      pointRadius: 4,
      pointBackgroundColor: chartColors.red,
    },
  ],
};

const options: ChartOptions<'line'> = {
  ...baseLineOptions,
  scales: {
    ...baseLineOptions.scales,
    y: {
      ...baseLineOptions.scales?.y,
      min: 0,
      max: 100,
      ticks: {
        ...((baseLineOptions.scales?.y && 'ticks' in baseLineOptions.scales.y) ? baseLineOptions.scales.y.ticks : {}),
        callback: (val) => `${val}`,
      },
      title: { display: true, text: 'Hot Startup (ms)' },
    },
  },
};

export function HotStartupWidget({ instance, index }: WidgetInstanceProps) {
  const filterPanel = useFilterPanel();
  const staggerStyle = useStaggeredEntry(index);
  const { removeWidget, updateWidgetFilters, updateWidgetLabel } = useDashboard();

  const compareItems = getCompareItems(instance);
  const isComparing = compareItems.length > 0;

  const chartData = useMemo(() => {
    if (!isComparing) return defaultChartData;
    return {
      labels,
      datasets: compareItems.map((item) => ({
        label: item.label,
        data: generateVariant(baseValues, item.id),
        borderColor: item.color,
        backgroundColor: withAlpha(item.color, 0.08),
        fill: false,
      })),
    };
  }, [isComparing, compareItems]);

  const chartOptions: ChartOptions<'line'> = useMemo(() => {
    if (!isComparing) return options;
    return {
      ...options,
      plugins: {
        ...options.plugins,
        legend: { display: true },
      },
    };
  }, [isComparing]);

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
          <Line data={chartData} options={chartOptions} />
        </div>
        {isComparing ? (
          <CompareStatsTable
            columns={[{ label: 'Hot Startup', unit: ' ms' }]}
            rows={compareItems.map((item) => ({
              label: item.label,
              color: item.color,
              values: [computeStats(generateVariant(baseValues, item.id))],
            }))}
          />
        ) : (
          <StatsRow stats={hotStartupStats} />
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
