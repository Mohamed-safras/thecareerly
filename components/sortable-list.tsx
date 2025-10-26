import { SortableRenderApi } from "@/types/sortable-render-api";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableRow from "./sortable-row";

export type Id = string | number;

type SortableListProps<T> = {
  items: T[];
  getId: (item: T) => Id;
  onReorder: (next: T[]) => void;
  renderItem: (args: {
    item: T;
    index: number;
    sortable: SortableRenderApi;
  }) => React.ReactNode;
  className?: string;
};

export default function SortableList<T>({
  items,
  getId,
  onReorder,
  renderItem,
  className,
}: SortableListProps<T>) {
  const ids = items?.map(getId);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.findIndex((id) => id === active.id);
    const newIndex = ids.findIndex((id) => id === over.id);
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className={className}>
          {items?.map((item, index) => (
            <SortableRow id={getId(item)} key={String(getId(item))}>
              {(sortable) => renderItem({ item, index, sortable })}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
