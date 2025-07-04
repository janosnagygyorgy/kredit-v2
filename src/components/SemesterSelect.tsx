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
    </>
  );
}

export default SemesterSelect;
