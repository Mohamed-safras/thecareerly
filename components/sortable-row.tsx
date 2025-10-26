import { SortableRenderApi } from "@/types/sortable-render-api";
import { useSortable } from "@dnd-kit/sortable";
import { Id } from "./sortable-list";
import { CSS } from "@dnd-kit/utilities";

export default function SortableRow({
  id,
  children,
}: {
  id: Id;
  children: (s: SortableRenderApi) => React.ReactNode;
}) {
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
  };
  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners, setNodeRef, style, isDragging })}
    </div>
  );
}
