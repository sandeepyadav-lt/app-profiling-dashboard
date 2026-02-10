import { WidgetCard } from '../shared/WidgetCard';
import { Badge } from '../shared/Badge';
import { FilterPanel } from '../shared/FilterPanel';
import { useFilterPanel } from '../../hooks/useFilterPanel';
import { useStaggeredEntry } from '../../hooks/useStaggeredEntry';
import { useDashboard } from '../../context/DashboardContext';
import { slaRules, slaSummary } from '../../data/sla-data';
import type { WidgetInstanceProps } from '../../types/dashboard';
import styles from './SlaComplianceWidget.module.css';

export function SlaComplianceWidget({ instance, index }: WidgetInstanceProps) {
  const filterPanel = useFilterPanel();
  const staggerStyle = useStaggeredEntry(index);
  const { removeWidget, updateWidgetFilters, updateWidgetLabel } = useDashboard();

  return (
    <>
      <WidgetCard
        title={instance.label}
        badge={
          slaSummary.critical > 0
            ? <Badge variant="danger">{slaSummary.critical} Critical</Badge>
            : <Badge variant="success">All Clear</Badge>
        }
        fullSpan={instance.fullSpan}
        style={staggerStyle}
        onFilterClick={filterPanel.open}
        onRemove={() => removeWidget(instance.id)}
        onRename={(label) => updateWidgetLabel(instance.id, label)}
      >
        <div className={styles.summaryRow}>
          <div className={`${styles.summaryCard} ${styles.ok}`}>
            <span className={styles.summaryCount}>{slaSummary.ok}</span>
            <span className={styles.summaryLabel}>Passing</span>
          </div>
          <div className={`${styles.summaryCard} ${styles.warning}`}>
            <span className={styles.summaryCount}>{slaSummary.warning}</span>
            <span className={styles.summaryLabel}>Warning</span>
          </div>
          <div className={`${styles.summaryCard} ${styles.critical}`}>
            <span className={styles.summaryCount}>{slaSummary.critical}</span>
            <span className={styles.summaryLabel}>Critical</span>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Condition</th>
                <th>Current</th>
                <th>Status</th>
                <th>Breaches</th>
                <th>Last Breached</th>
              </tr>
            </thead>
            <tbody>
              {slaRules.map((rule) => (
                <tr key={rule.id}>
                  <td className={styles.metricName}>{rule.metric}</td>
                  <td className={styles.condition}>{rule.condition}</td>
                  <td className={styles.currentValue}>{rule.currentValue}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[rule.status]}`}>
                      <span className={styles.statusDot} />
                      {rule.status}
                    </span>
                  </td>
                  <td className={`${styles.breachCount} ${rule.breachCount > 0 ? styles.hasBreaches : ''}`}>
                    {rule.breachCount}
                  </td>
                  <td className={styles.lastBreached}>{rule.lastBreached ?? '—'}</td>
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
