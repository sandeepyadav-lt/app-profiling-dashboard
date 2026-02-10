import type { ReactNode } from 'react';
import styles from './WidgetGrid.module.css';

interface WidgetGridProps {
  children: ReactNode;
}

export function WidgetGrid({ children }: WidgetGridProps) {
  return <div className={styles.grid}>{children}</div>;
}
