import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './icons';
import styles from './FilterDropdown.module.css';

interface FilterDropdownOption {
  id: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterDropdownOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function FilterDropdown({ label, options, selected, onChange }: FilterDropdownProps) {
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

  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={`${styles.trigger} ${selected.length > 0 ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        {selected.length > 0 && <span className={styles.badge}>{selected.length}</span>}
        <ChevronDownIcon size={12} />
      </button>

      {isOpen && (
        <div className={styles.popover}>
          {options.map((opt) => (
            <label key={opt.id} className={styles.optionItem}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selected.includes(opt.id)}
                onChange={() => handleToggle(opt.id)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
