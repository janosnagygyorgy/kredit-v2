import { useState } from "react";

interface DropZoneProps {
  index: number;
  handleOnDrop: (index: number) => void;
}

function DropZone({ index, handleOnDrop }: DropZoneProps) {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  return (
    <div
      onDragEnter={() => setIsDraggedOver(() => true)}
      onDragLeave={() => setIsDraggedOver(() => false)}
      onDrop={() => {
        setIsDraggedOver(() => false);
        handleOnDrop(index);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={`text-center text-xs m-0.5
        border-dashed border-1 rounded-sm
        transition-all duration-100 ease-in-out
        ${isDraggedOver ? "h-5" : "h-2 opacity-0"}`}
    >
      Áthelyezés
    </div>
  );
}

export default DropZone;
