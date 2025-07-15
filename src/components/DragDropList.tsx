import { useRef, type ReactNode } from "react";
import DropZone from "./DropZone";
import DragDropOption from "./DragDropOption";
import { v4 } from "uuid";

interface DragDropListProps {
  onMoveItem: (fromIndex: number, toIndex: number) => void;
  children: ReactNode[];
}

function DragDropList({ onMoveItem, children }: DragDropListProps) {
  const dragStartIndex = useRef(-1);

  function handleDragStart(index: number) {
    dragStartIndex.current = index;
  }

  function handleOnDrop(index: number) {
    console.log(
      `[DragDropList.tsx] Dragged from ${dragStartIndex.current} to ${index}`
    );
    onMoveItem(dragStartIndex.current, index);
  }

  return (
    <>
      <DropZone index={0} handleOnDrop={handleOnDrop} />
      {children.map((child, index) => (
        <div key={v4()}>
          <DragDropOption index={index} handleDragStart={handleDragStart}>
            {child}
          </DragDropOption>
          <DropZone index={index + 1} handleOnDrop={handleOnDrop} />
        </div>
      ))}
    </>
  );
}

export default DragDropList;
