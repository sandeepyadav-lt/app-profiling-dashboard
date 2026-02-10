import type { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
}

export function IconButton({ children, label, className, ...props }: IconButtonProps) {
  return (
    <button
      className={`${styles.iconButton} ${className ?? ''}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}
