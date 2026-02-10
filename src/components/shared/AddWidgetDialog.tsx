import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { widgetRegistry } from '../../data/widget-registry';
import { useDashboard } from '../../context/DashboardContext';
import { IconButton } from './IconButton';
import { XIcon } from './icons';
import type { WidgetType } from '../../types/dashboard';
import styles from './AddWidgetDialog.module.css';

interface AddWidgetDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddWidgetDialog({ isOpen, onClose }: AddWidgetDialogProps) {
  const { addWidget } = useDashboard();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) setClosing(false);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  }, [closing, onClose]);

  const handleSelect = useCallback((type: WidgetType) => {
    addWidget(type);
    handleClose();
  }, [addWidget, handleClose]);

  if (!isOpen && !closing) return null;

  return createPortal(
    <>
      <div className={`${styles.backdrop} ${closing ? styles.closing : ''}`} onClick={handleClose} />
      <div className={`${styles.dialog} ${closing ? styles.closing : ''}`}>
        <div className={styles.header}>
          <span className={styles.title}>Add Widget</span>
          <IconButton label="Close" onClick={handleClose}>
            <XIcon size={16} />
          </IconButton>
        </div>
        <div className={styles.grid}>
          {widgetRegistry.map((meta) => (
            <button
              key={meta.type}
              className={styles.card}
              onClick={() => handleSelect(meta.type)}
            >
              <span className={styles.cardLabel}>{meta.label}</span>
              <span className={styles.cardDesc}>{meta.description}</span>
            </button>
          ))}
        </div>
      </div>
    </>,
    document.body,
  );
}
