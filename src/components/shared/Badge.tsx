import styles from './Badge.module.css';

type Variant = 'default' | 'success' | 'danger' | 'attention' | 'accent' | 'brand';

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  );
}
