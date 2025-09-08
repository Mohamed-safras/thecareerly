export type SortableRenderApi = {
  attributes: React.HTMLAttributes<HTMLElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listeners: any;
  setNodeRef: (node: HTMLElement | null) => void;
  style: React.CSSProperties;
  isDragging: boolean;
};
