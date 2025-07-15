interface DropZoneProps {
  index: number;
  handleOnDrop: (index: number) => void;
}

function DropZone({ index, handleOnDrop }: DropZoneProps) {
  return (
    <div
      onDrop={() => {
        handleOnDrop(index);
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{ height: "20px", backgroundColor: "blue" }}
    ></div>
  );
}

export default DropZone;
