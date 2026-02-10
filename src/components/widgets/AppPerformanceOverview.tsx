import { WidgetCard } from '../shared/WidgetCard';
import { Badge } from '../shared/Badge';
import { FilterTags } from '../shared/FilterTags';
import { FilterPanel } from '../shared/FilterPanel';
import { ArrowUpIcon, ArrowDownIcon } from '../shared/icons';
import { useFilterPanel } from '../../hooks/useFilterPanel';
import { useStaggeredEntry } from '../../hooks/useStaggeredEntry';
import { useDashboard } from '../../context/DashboardContext';
import { kpiData } from '../../data/kpi-data';
import { filterCategories } from '../../data/filter-categories';
import type { WidgetInstanceProps, FilterTag } from '../../types/dashboard';
import styles from './AppPerformanceOverview.module.css';

function deriveFilterTags(selections: Record<string, string[]>): FilterTag[] {
  const tags: FilterTag[] = [];
  for (const [catId, optIds] of Object.entries(selections)) {
    const cat = filterCategories.find((c) => c.id === catId);
    if (!cat) continue;
    for (const optId of optIds) {
      const opt = cat.options.find((o) => o.id === optId);
      if (opt) tags.push({ id: opt.id, label: opt.label, category: catId });
    }
  }
  return tags;
}

export function AppPerformanceOverview({ instance, index }: WidgetInstanceProps) {
  const filterPanel = useFilterPanel();
  const staggerStyle = useStaggeredEntry(index);
  const { removeWidget, updateWidgetFilters, updateWidgetLabel } = useDashboard();

  const tags = deriveFilterTags(instance.filters.selections);

  const removeTag = (id: string) => {
    const next: Record<string, string[]> = {};
    for (const [catId, optIds] of Object.entries(instance.filters.selections)) {
      const filtered = optIds.filter((o) => o !== id);
      if (filtered.length > 0) next[catId] = filtered;
    }
    updateWidgetFilters(instance.id, { selections: next });
  };

  return (
    <>
      <WidgetCard
        title={instance.label}
        badge={<Badge variant="accent">4 KPIs</Badge>}
        fullSpan={instance.fullSpan}
        style={staggerStyle}
        onFilterClick={filterPanel.open}
        onRemove={() => removeWidget(instance.id)}
        onRename={(label) => updateWidgetLabel(instance.id, label)}
      >
        {tags.length > 0 && <FilterTags tags={tags} onRemove={removeTag} />}
        <div className={styles.kpiGrid}>
          {kpiData.map((kpi) => (
            <div key={kpi.label} className={styles.kpiCard}>
              <div className={styles.kpiLabel}>{kpi.label}</div>
              <div className={styles.kpiValueRow}>
                <span className={styles.kpiValue}>{kpi.value}</span>
                <span className={styles.kpiUnit}>{kpi.unit}</span>
              </div>
              <div className={`${styles.kpiDelta} ${styles[kpi.sentiment]}`}>
                {kpi.trend === 'up' ? <ArrowUpIcon size={11} /> : <ArrowDownIcon size={11} />}
                {Math.abs(kpi.delta)}{kpi.unit === '%' || kpi.unit === 'fps' ? '' : ` ${kpi.unit}`}
                <span className={styles.deltaLabel}>{kpi.deltaLabel}</span>
              </div>
            </div>
          ))}
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
