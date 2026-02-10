import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { filterCategories } from '../../data/filter-categories';
import { IconButton } from './IconButton';
import { XIcon } from './icons';
import type { WidgetFilterState } from '../../types/dashboard';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters?: WidgetFilterState;
  onApply?: (filters: WidgetFilterState) => void;
}

function buildInitialDraft(current?: WidgetFilterState): Record<string, string[]> {
  if (current && Object.keys(current.selections).length > 0) {
    return structuredClone(current.selections);
  }
  const draft: Record<string, string[]> = {};
  for (const cat of filterCategories) {
    const checked = cat.options.filter((o) => o.checked).map((o) => o.id);
    if (checked.length > 0) draft[cat.id] = checked;
  }
  return draft;
}

export function FilterPanel({ isOpen, onClose, currentFilters, onApply }: FilterPanelProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(filterCategories[0].id);
  const [closing, setClosing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string[]>>(() => buildInitialDraft(currentFilters));
  const [draftCompareCategory, setDraftCompareCategory] = useState<string | undefined>(
    () => currentFilters?.compareCategory,
  );

  const activeCategory = filterCategories.find((c) => c.id === activeCategoryId) ?? filterCategories[0];
  const isCompareMode = draftCompareCategory === activeCategoryId;

  useEffect(() => {
    if (isOpen) {
      setClosing(false);
      setDraft(buildInitialDraft(currentFilters));
      setDraftCompareCategory(currentFilters?.compareCategory);
    }
  }, [isOpen, currentFilters]);

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 280);
  }, [closing, onClose]);

  const handleApply = useCallback(() => {
    if (closing) return;
    onApply?.({ selections: draft, compareCategory: draftCompareCategory });
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 280);
  }, [closing, draft, draftCompareCategory, onApply, onClose]);

  const toggleOption = useCallback((catId: string, optId: string) => {
    setDraft((prev) => {
      const current = prev[catId] ?? [];
      const has = current.includes(optId);
      const next = has ? current.filter((id) => id !== optId) : [...current, optId];
      const copy = { ...prev };
      if (next.length === 0) {
        delete copy[catId];
      } else {
        copy[catId] = next;
      }
      return copy;
    });
  }, []);

  if (!isOpen && !closing) return null;

  return createPortal(
    <>
      <div className={`${styles.backdrop} ${closing ? styles.closing : ''}`} onClick={handleClose} />
      <div className={`${styles.panel} ${closing ? styles.closing : ''}`}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>Filters</span>
          <IconButton label="Close" onClick={handleClose}>
            <XIcon size={16} />
          </IconButton>
        </div>

        <div className={styles.panelBody}>
          <div className={styles.categorySidebar}>
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.categoryBtn} ${cat.id === activeCategoryId ? styles.active : ''}`}
                onClick={() => setActiveCategoryId(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className={`${styles.optionsList} ${isCompareMode ? styles.compareActive : ''}`}>
            <div className={styles.modeToggle}>
              <button
                className={`${styles.modeBtn} ${!isCompareMode ? styles.modeBtnActive : ''}`}
                onClick={() => {
                  if (isCompareMode) setDraftCompareCategory(undefined);
                }}
              >
                Filter
              </button>
              <button
                className={`${styles.modeBtn} ${isCompareMode ? styles.modeBtnActive : ''}`}
                onClick={() => setDraftCompareCategory(activeCategoryId)}
              >
                Compare
              </button>
            </div>
            {isCompareMode && (
              <div className={styles.compareHint}>
                Each selected value will appear as a separate series
              </div>
            )}
            {activeCategory.options.map((opt) => (
              <div key={opt.id} className={styles.optionItem}>
                <input
                  type="checkbox"
                  id={`${activeCategory.id}-${opt.id}`}
                  className={styles.checkbox}
                  checked={draft[activeCategory.id]?.includes(opt.id) ?? false}
                  onChange={() => toggleOption(activeCategory.id, opt.id)}
                />
                <label htmlFor={`${activeCategory.id}-${opt.id}`}>{opt.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.panelFooter}>
          <button className={styles.btnSecondary} onClick={handleClose}>Cancel</button>
          <button className={styles.btnPrimary} onClick={handleApply}>Apply Filters</button>
        </div>
      </div>
    </>,
    document.body,
  );
}
