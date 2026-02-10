import type { FilterTag } from '../../types/dashboard';
import { XIcon } from './icons';
import styles from './FilterTags.module.css';

interface FilterTagsProps {
  tags: FilterTag[];
  onRemove: (id: string) => void;
}

export function FilterTags({ tags, onRemove }: FilterTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className={styles.container}>
      {tags.map((tag) => (
        <span key={tag.id} className={styles.tag}>
          {tag.label}
          <button className={styles.removeBtn} onClick={() => onRemove(tag.id)} aria-label={`Remove ${tag.label}`}>
            <XIcon size={10} />
          </button>
        </span>
      ))}
    </div>
  );
}
