import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './icons';
import styles from './KpiSelectorPopover.module.css';

interface KpiOption {
  id: string;
  label: string;
  color: string;
  visible: boolean;
}

interface KpiSelectorPopoverProps {
  options: KpiOption[];
  onToggle: (id: string) => void;
}

export function KpiSelectorPopover({ options, onToggle }: KpiSelectorPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const visibleCount = options.filter((o) => o.visible).length;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        KPIs ({visibleCount})
        <ChevronDownIcon size={12} />
      </button>

      {isOpen && (
        <div className={styles.popover}>
          {options.map((opt) => (
            <div key={opt.id} className={styles.optionItem}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={opt.visible}
                onChange={() => onToggle(opt.id)}
                id={`kpi-${opt.id}`}
              />
              <span className={styles.colorDot} style={{ backgroundColor: opt.color }} />
              <label htmlFor={`kpi-${opt.id}`}>{opt.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
