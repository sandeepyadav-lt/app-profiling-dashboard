import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { WidgetCard } from '../shared/WidgetCard';
import { FilterPanel } from '../shared/FilterPanel';
import { useFilterPanel } from '../../hooks/useFilterPanel';
import { useStaggeredEntry } from '../../hooks/useStaggeredEntry';
import { useDashboard } from '../../context/DashboardContext';
import { flowData, slaThreshold } from '../../data/flow-data';
import { chartColors } from '../../utils/chart-colors';
import { baseBarOptions } from '../../utils/chart-defaults';
import { generateVariant, getCompareItems } from '../../utils/mock-variants';
import { getHorizontalThresholdAnnotations } from '../../utils/threshold-zones';
import type { WidgetInstanceProps } from '../../types/dashboard';
import type { ChartOptions } from 'chart.js';
import styles from './FlowPerformanceWidget.module.css';

const flowLabels = flowData.map((f) => f.name);
const flowDurations = flowData.map((f) => f.duration);

const defaultChartData = {
  labels: flowLabels,
  datasets: [
    {
      label: 'Duration (s)',
      data: flowDurations,
      backgroundColor: flowData.map((f) =>
        f.duration > slaThreshold ? chartColors.red : chartColors.cyan,
      ),
      borderRadius: 3,
      barThickness: 20,
    },
  ],
};

const baseOptions: ChartOptions<'bar'> = {
  ...baseBarOptions,
  scales: {
    ...baseBarOptions.scales,
    x: {
      ...baseBarOptions.scales?.x,
      max: 5,
      ticks: {
        ...((baseBarOptions.scales?.x && 'ticks' in baseBarOptions.scales.x) ? baseBarOptions.scales.x.ticks : {}),
        callback: (val) => `${val}s`,
      },
    },
  },
  plugins: {
    ...baseBarOptions.plugins,
    annotation: {
      annotations: {
        ...getHorizontalThresholdAnnotations('flowDuration', 0, 5),
        slaLine: {
          type: 'line' as const,
          xMin: slaThreshold,
          xMax: slaThreshold,
          borderColor: chartColors.slaRed,
          borderWidth: 2,
          borderDash: [6, 4],
          label: {
            display: true,
            content: `SLA: ${slaThreshold}s`,
            position: 'start' as const,
            backgroundColor: chartColors.slaRed,
            color: '#fff',
            font: { size: 10, family: 'Mona Sans' },
            padding: { top: 2, bottom: 2, left: 6, right: 6 },
            borderRadius: 3,
          },
        },
      },
    },
  },
};

export function FlowPerformanceWidget({ instance, index }: WidgetInstanceProps) {
  const filterPanel = useFilterPanel();
  const staggerStyle = useStaggeredEntry(index);
  const { removeWidget, updateWidgetFilters, updateWidgetLabel } = useDashboard();

  const compareItems = getCompareItems(instance);
  const isComparing = compareItems.length > 0;

  const chartData = useMemo(() => {
    if (!isComparing) return defaultChartData;
    return {
      labels: flowLabels,
      datasets: compareItems.map((item) => ({
        label: item.label,
        data: generateVariant(flowDurations, item.id, 0.2),
        backgroundColor: item.color,
        borderRadius: 3,
        barThickness: 14,
      })),
    };
  }, [isComparing, compareItems]);

  const options: ChartOptions<'bar'> = useMemo(() => {
    if (!isComparing) return baseOptions;
    return {
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
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
          <Bar data={chartData} options={options} />
        </div>
        {!isComparing && (
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={styles.legendDot} style={{ backgroundColor: chartColors.cyan }} />
              Within SLA
            </span>
            <span className={styles.legendItem}>
              <span className={styles.legendDot} style={{ backgroundColor: chartColors.red }} />
              Exceeds SLA
            </span>
            <span className={styles.legendItem}>
              <span className={styles.legendLine} style={{ borderColor: chartColors.slaRed }} />
              SLA Threshold ({slaThreshold}s)
            </span>
          </div>
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
