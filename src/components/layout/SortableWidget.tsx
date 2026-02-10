import { createContext, useContext, type ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface DragHandleContextValue {
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
}

const DragHandleContext = createContext<DragHandleContextValue | null>(null);

export function useDragHandle() {
  return useContext(DragHandleContext);
}

interface SortableWidgetProps {
  id: string;
  fullSpan?: boolean;
  children: ReactNode;
}

export function SortableWidget({ id, fullSpan, children }: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : undefined,
    ...(fullSpan ? { gridColumn: '1 / -1' } : {}),
  };

  return (
    <div ref={setNodeRef} style={style}>
      <DragHandleContext.Provider value={{ listeners, attributes }}>
        {children}
      </DragHandleContext.Provider>
    </div>
  );
}
