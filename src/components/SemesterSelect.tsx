import { useRef } from "react";
import DragDropList from "./DragDropList";

interface SemesterSelectProps {
  options: string[];
  selectedSemester: string;
  onAddSemester: (newSemester: string) => void;
  onChangeSelectedSemester: (selectedSemester: string) => void;
  onDeleteSemester: (semesterToDelete: string) => void;
  onMoveSemester: (fromIndex: number, toIndex: number) => void;
}

function SemesterSelect({
  options,
  selectedSemester,
  onAddSemester,
  onChangeSelectedSemester,
  onDeleteSemester,
  onMoveSemester,
}: SemesterSelectProps) {
  const addSemesterInput = useRef<HTMLInputElement>(null);

  function handleSemesterChange(semester: string) {
    onChangeSelectedSemester(semester);
  }

  return (
    <>
      <DragDropList
        onMoveItem={onMoveSemester}
        children={options.map((option, index) => (
          <div
            onClick={() => handleSemesterChange(option)}
            style={{
              backgroundColor: option === selectedSemester ? "red" : "",
              cursor: "grab",
            }}
          >
            {`${index}. ${option}`}
          </div>
        ))}
      />
      <button onClick={() => onDeleteSemester(selectedSemester)}>
        Félév törlése
      </button>
      <div>{selectedSemester}</div>
      <input type="text" ref={addSemesterInput} />
      <button
        onClick={() => {
          if (!addSemesterInput.current) return;
          onAddSemester(addSemesterInput.current.value);
          addSemesterInput.current.value = "";
        }}
      >
        Félév hozzáadása
      </button>
    </>
  );
}

export default SemesterSelect;
