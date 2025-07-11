import { useRef } from "react";
import { v4 } from "uuid";

interface SemesterListProps {
  options: string[];
  selectedSemester: string;
  handleSemesterChange: (semester: string) => void;
  onMoveSemester: (fromIndex: number, toIndex: number) => void;
}

function SemesterList({
  options,
  selectedSemester,
  handleSemesterChange,
  onMoveSemester,
}: SemesterListProps) {
  const dragStartIndex = useRef(-1);

  function handleDragStart(index: number) {
    dragStartIndex.current = index;
  }

  function handleOnDrop(index: number) {
    console.log(`Dragged from ${dragStartIndex.current} to ${index}`);
    onMoveSemester(dragStartIndex.current, index);
  }

  return (
    <>
      <DropZone index={0} handleOnDrop={handleOnDrop} />
      {options.map((option, index) => (
        <div key={v4()}>
          <SemesterOption
            option={option}
            index={index}
            selectedSemester={selectedSemester}
            handleDragStart={handleDragStart}
            handleSemesterChange={handleSemesterChange}
          />
          <DropZone index={index + 1} handleOnDrop={handleOnDrop} />
        </div>
      ))}
    </>
  );
}

export default SemesterList;

interface SemesterOptionProps {
  option: string;
  index: number;
  selectedSemester: string;
  handleDragStart: (index: number) => void;
  handleSemesterChange: (semester: string) => void;
}

function SemesterOption({
  option,
  index,
  selectedSemester,
  handleDragStart,
  handleSemesterChange,
}: SemesterOptionProps) {
  return (
    <div
      style={{
        backgroundColor: option === selectedSemester ? "red" : "",
        cursor: "grab",
      }}
      draggable
      onDragStart={() => {
        handleDragStart(index);
      }}
      onClick={() => handleSemesterChange(option)}
    >
      {`${index}. ${option}`}
    </div>
  );
}

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
