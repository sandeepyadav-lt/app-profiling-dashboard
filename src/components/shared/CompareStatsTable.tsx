import styles from './CompareStatsTable.module.css';

interface CompareStatsColumn {
  label: string;
  unit: string;
}

interface CompareStatsRowData {
  label: string;
  color: string;
  values: { min: number; max: number; mean: number }[];
}

interface CompareStatsTableProps {
  columns: CompareStatsColumn[];
  rows: CompareStatsRowData[];
}

function fmt(value: number, unit: string): string {
  const n = Number.isInteger(value) ? value.toString() : value.toFixed(1);
  return unit.startsWith(' ') ? `${n}${unit}` : `${n}${unit}`;
}

export function CompareStatsTable({ columns, rows }: CompareStatsTableProps) {
  const multi = columns.length > 1;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          {multi && (
            <tr>
              <th />
              {columns.map((col) => (
                <th key={col.label} colSpan={3} className={styles.groupHeader}>
                  {col.label}
                </th>
              ))}
            </tr>
          )}
          <tr>
            <th />
            {columns.map((col) =>
              ['Min', 'Max', 'Mean'].map((stat) => (
                <th key={`${col.label}-${stat}`}>
                  {multi ? stat : `${stat}`}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>
                <span className={styles.rowLabel}>
                  <span className={styles.dot} style={{ backgroundColor: row.color }} />
                  {row.label}
                </span>
              </td>
              {row.values.map((v, ci) => {
                const unit = columns[ci].unit;
                return ['min' as const, 'max' as const, 'mean' as const].map((stat) => (
                  <td key={`${columns[ci].label}-${stat}`}>{fmt(v[stat], unit)}</td>
                ));
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
