import { useDashboard } from '../../context/DashboardContext';
import { FilterDropdown } from '../shared/FilterDropdown';
import { filterCategories } from '../../data/filter-categories';
import { CalendarIcon, PlusIcon } from '../shared/icons';
import type { DateRange, Frequency } from '../../types/dashboard';
import styles from './GlobalFilterBar.module.css';

const dateRangeLabels: Record<DateRange, string> = {
  '7d': 'Last 7 days',
  '14d': 'Last 14 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
};

const globalFilterCategoryIds = [
  'platform',
  'flow_scenario',
  'environment',
  'network',
  'app_version',
  'device',
  'labels',
];

const globalCategories = filterCategories.filter((c) =>
  globalFilterCategoryIds.includes(c.id),
);

interface GlobalFilterBarProps {
  onAddWidget: () => void;
}

export function GlobalFilterBar({ onAddWidget }: GlobalFilterBarProps) {
  const { globalFilters, updateGlobalFilters, dateRange, setDateRange, frequency, setFrequency } = useDashboard();

  const hasActiveFilters = Object.values(globalFilters.selections).some(
    (arr) => arr.length > 0,
  );

  const handleChange = (categoryId: string, selected: string[]) => {
    const next = { ...globalFilters.selections };
    if (selected.length === 0) {
      delete next[categoryId];
    } else {
      next[categoryId] = selected;
    }
    updateGlobalFilters({ selections: next });
  };

  const clearAll = () => {
    updateGlobalFilters({ selections: {} });
  };

  return (
    <div className={styles.bar}>
      <div className={styles.filters}>
        {globalCategories.map((cat) => (
          <FilterDropdown
            key={cat.id}
            label={cat.label}
            options={cat.options.map((o) => ({ id: o.id, label: o.label }))}
            selected={globalFilters.selections[cat.id] ?? []}
            onChange={(selected) => handleChange(cat.id, selected)}
          />
        ))}
        {hasActiveFilters && (
          <button className={styles.clearBtn} onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.addBtn} onClick={onAddWidget}>
          <PlusIcon size={14} />
          Add Widget
        </button>

        <div className={styles.dateSelect}>
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
      </div>
    </div>
  );
}
