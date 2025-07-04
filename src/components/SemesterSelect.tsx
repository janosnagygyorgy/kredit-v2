import { useRef } from "react";
import { v4 } from "uuid";

interface SemesterSelectProps {
  options: string[];
  selectedSemester: string;
  onAddSemester: (newSemester: string) => void;
  onChangeSelectedSemester: (selectedSemester: string) => void;
  onDeleteSemester: (semesterToDelete: string) => void;
}

function SemesterSelect({
  options,
  selectedSemester,
  onAddSemester,
  onChangeSelectedSemester,
  onDeleteSemester,
}: SemesterSelectProps) {
  const addSemesterInput = useRef<HTMLInputElement>(null);

  function handleSemesterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChangeSelectedSemester(event.target.value);
  }

  return (
    <>
      <select value={selectedSemester} onChange={handleSemesterChange}>
        {options.map((option) => (
          <option key={v4()} value={option}>
            {option}
          </option>
        ))}
      </select>
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
