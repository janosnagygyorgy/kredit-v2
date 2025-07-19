import { useRef } from "react";
import type { DraggableItem } from "./DraggableItem";
import DropZone from "./DropZone";
import DragDropOption from "./DragDropOption";

interface DragDropListProps {
  onMoveItem: (fromIndex: number, toIndex: number) => void;
  items: DraggableItem[];
}

function DragDropList({ onMoveItem, items }: DragDropListProps) {
  const dragStartIndex = useRef(-1);

  function handleDragStart(index: number) {
    dragStartIndex.current = index;
  }

  function handleOnDrop(index: number) {
    if (dragStartIndex.current === -1) return;
    onMoveItem(dragStartIndex.current, index);
    dragStartIndex.current = -1;
  }

  return (
    <>
      <DropZone index={0} handleOnDrop={handleOnDrop} />
      {items.map((item, index) => (
        <div key={item.key}>
          <DragDropOption index={index} handleDragStart={handleDragStart}>
            {item.children}
          </DragDropOption>
          <DropZone index={index + 1} handleOnDrop={handleOnDrop} />
        </div>
      ))}
    </>
  );
}

export default DragDropList;
