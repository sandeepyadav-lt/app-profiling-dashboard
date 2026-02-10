import { IconButton } from '../shared/IconButton';
import { RefreshIcon, CalendarIcon, PlusIcon } from '../shared/icons';
import { useDashboard } from '../../context/DashboardContext';
import type { DateRange, Frequency } from '../../types/dashboard';
import styles from './DashboardHeader.module.css';

const dateRangeLabels: Record<DateRange, string> = {
  '7d': 'Last 7 days',
  '14d': 'Last 14 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
};

interface DashboardHeaderProps {
  onAddWidget: () => void;
}

export function DashboardHeader({ onAddWidget }: DashboardHeaderProps) {
  const { dateRange, setDateRange, frequency, setFrequency } = useDashboard();

  return (
    <div className={styles.header}>
      <div className={styles.titleGroup}>
        <h1 className={styles.title}>App Performance</h1>

      </div>

      <div className={styles.controls}>
        <button className={styles.addBtn} onClick={onAddWidget}>
          <PlusIcon size={14} />
          Add Widget
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CalendarIcon size={14} />
          <select
            className={styles.select}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRange)}
          >
            {Object.entries(dateRangeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <select
          className={styles.select}
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as Frequency)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <IconButton label="Refresh dashboard">
          <RefreshIcon size={16} />
        </IconButton>
      </div>
    </div>
  );
}
