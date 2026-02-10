import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { WidgetCard } from '../shared/WidgetCard';
import { FilterPanel } from '../shared/FilterPanel';
import { KpiSelectorPopover } from '../shared/KpiSelectorPopover';
import { useFilterPanel } from '../../hooks/useFilterPanel';
import { useStaggeredEntry } from '../../hooks/useStaggeredEntry';
import { useDashboard } from '../../context/DashboardContext';
import { trendLabels, trendLines as initialTrendLines } from '../../data/trends-data';
import { withAlpha } from '../../utils/chart-colors';
import { baseLineOptions } from '../../utils/chart-defaults';
import { generateVariant, getCompareItems, getCompareDash } from '../../utils/mock-variants';
import type { WidgetInstanceProps } from '../../types/dashboard';
import type { ChartOptions } from 'chart.js';
import styles from './PerformanceTrendsWidget.module.css';

export function PerformanceTrendsWidget({ instance, index }: WidgetInstanceProps) {
  const filterPanel = useFilterPanel();
  const staggerStyle = useStaggeredEntry(index);
  const { removeWidget, updateWidgetFilters, updateWidgetKpiVisibility, updateWidgetLabel } = useDashboard();

  const kpiVis = instance.kpiVisibility ?? Object.fromEntries(initialTrendLines.map((l) => [l.id, l.visible]));

  const toggleKpi = (id: string) => {
    updateWidgetKpiVisibility(instance.id, { ...kpiVis, [id]: !kpiVis[id] });
  };

  const trendLines = initialTrendLines.map((line) => ({
    ...line,
    visible: kpiVis[line.id] ?? line.visible,
  }));

  const kpiOptions = trendLines.map((line) => ({
    id: line.id,
    label: line.label,
    color: line.color,
    visible: line.visible,
  }));

  const visibleLines = trendLines.filter((l) => l.visible);
  const compareItems = getCompareItems(instance);
  const isComparing = compareItems.length > 0;
  const hasRightAxis = visibleLines.some((l) => l.yAxisID === 'y1');

  const chartData = useMemo(() => {
    if (!isComparing) {
      return {
        labels: trendLabels,
        datasets: visibleLines.map((line) => ({
          label: line.label,
          data: line.data,
          borderColor: line.color,
          backgroundColor: withAlpha(line.color, 0.05),
          yAxisID: line.yAxisID,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: false,
        })),
      };
    }

    const datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      yAxisID: string;
      tension: number;
      borderWidth: number;
      pointRadius: number;
      pointHoverRadius: number;
      fill: boolean;
      borderDash: number[];
    }> = [];

    for (const line of visibleLines) {
      for (let ci = 0; ci < compareItems.length; ci++) {
        const cItem = compareItems[ci];
        datasets.push({
          label: `${line.label} — ${cItem.label}`,
          data: generateVariant(line.data, `${line.id}-${cItem.id}`),
          borderColor: line.color,
          backgroundColor: withAlpha(line.color, 0.05),
          yAxisID: line.yAxisID,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: false,
          borderDash: getCompareDash(ci),
        });
      }
    }

    return { labels: trendLabels, datasets };
  }, [visibleLines, isComparing, compareItems]);

  const chartOptions: ChartOptions<'line'> = useMemo(() => {
    const yTicks = baseLineOptions.scales?.y && 'ticks' in baseLineOptions.scales.y
      ? baseLineOptions.scales.y.ticks
      : {};

    return {
      ...baseLineOptions,
      plugins: {
        ...baseLineOptions.plugins,
        legend: { display: isComparing },
      },
      scales: {
        x: baseLineOptions.scales?.x ?? {},
        y: {
          ...baseLineOptions.scales?.y,
          position: 'left' as const,
          ticks: {
            ...yTicks,
            callback: (val: string | number) => `${parseFloat(Number(val).toPrecision(4))}%`,
          },
        },
        ...(hasRightAxis
          ? {
              y1: {
                position: 'right' as const,
                grid: { drawOnChartArea: false },
                border: { display: false },
                ticks: {
                  ...yTicks,
                  callback: (val: string | number) => `${parseFloat(Number(val).toPrecision(4))} MB`,
                },
              },
            }
          : {}),
      },
    };
  }, [hasRightAxis, isComparing]);

  return (
    <>
      <WidgetCard
        title={instance.label}
        fullSpan={instance.fullSpan}
        style={staggerStyle}
        onFilterClick={filterPanel.open}
        onRemove={() => removeWidget(instance.id)}
        onRename={(label) => updateWidgetLabel(instance.id, label)}
        headerActions={<KpiSelectorPopover options={kpiOptions} onToggle={toggleKpi} />}
      >
        <div className={styles.chartContainer}>
          <Line data={chartData} options={chartOptions} />
        </div>
        {!isComparing && (
          <div className={styles.legend}>
            {visibleLines.map((line) => (
              <span key={line.id} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: line.color }} />
                {line.label} ({line.unit})
              </span>
            ))}
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
