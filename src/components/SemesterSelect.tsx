interface SemesterSelectProps {
  selectedSemester: string;
  onChangeSelectedSemester: (selectedSemester: string) => void;
}

function SemesterSelect({
  selectedSemester,
  onChangeSelectedSemester,
}: SemesterSelectProps) {
  function handleSemesterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChangeSelectedSemester(event.target.value);
  }

  return (
    <>
      <select value={selectedSemester} onChange={handleSemesterChange}>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
      <div>{selectedSemester}</div>
    </>
  );
}

export default SemesterSelect;
