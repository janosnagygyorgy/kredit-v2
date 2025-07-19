import type { ReactNode } from "react";

interface DragDropOptionProps {
  children: ReactNode;
  index: number;
  handleDragStart: (index: number) => void;
}

function DragDropOption({
  children,
  index,
  handleDragStart,
}: DragDropOptionProps) {
  return (
    <div
      draggable
      onDragStart={() => {
        handleDragStart(index);
      }}
    >
      {children}
    </div>
  );
}

export default DragDropOption;
