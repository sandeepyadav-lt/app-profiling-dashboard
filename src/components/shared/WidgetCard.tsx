import { useState, useRef, useEffect, type ReactNode } from 'react';
import { IconButton } from './IconButton';
import { FilterIcon, XIcon, PencilIcon, DragHandleIcon } from './icons';
import { useDragHandle } from '../layout/SortableWidget';
import styles from './WidgetCard.module.css';

interface WidgetCardProps {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
  fullSpan?: boolean;
  style?: React.CSSProperties;
  onFilterClick?: () => void;
  onRemove?: () => void;
  onRename?: (newLabel: string) => void;
  headerActions?: ReactNode;
}

export function WidgetCard({
  title,
  badge,
  children,
  fullSpan,
  style,
  onFilterClick,
  onRemove,
  onRename,
  headerActions,
}: WidgetCardProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commitRename = () => {
    const trimmed = editValue.trim();
    if (trimmed && onRename) onRename(trimmed);
    setEditing(false);
  };

  const dragHandle = useDragHandle();

  return (
    <div className={`${styles.card} ${fullSpan ? styles.fullSpan : ''}`} style={style}>
      <div className={styles.header}>
        {dragHandle && (
          <button
            className={styles.dragHandle}
            {...dragHandle.attributes}
            {...dragHandle.listeners}
            aria-label="Drag to reorder"
          >
            <DragHandleIcon size={16} />
          </button>
        )}
        <div className={styles.titleGroup}>
          {editing ? (
            <input
              ref={inputRef}
              className={styles.titleInput}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitRename();
                if (e.key === 'Escape') { setEditValue(title); setEditing(false); }
              }}
              onBlur={commitRename}
            />
          ) : (
            <>
              <span className={styles.title}>{title}</span>
              {onRename && (
                <button
                  className={styles.editBtn}
                  onClick={() => { setEditValue(title); setEditing(true); }}
                  aria-label="Rename widget"
                >
                  <PencilIcon size={12} />
                </button>
              )}
            </>
          )}
          {badge}
        </div>
        <div className={styles.actions}>
          {headerActions}
          {onFilterClick && (
            <IconButton label="Filters" onClick={onFilterClick}>
              <FilterIcon size={14} />
            </IconButton>
          )}
          {onRemove && (
            <IconButton label="Remove widget" onClick={onRemove}>
              <XIcon size={14} />
            </IconButton>
          )}
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
