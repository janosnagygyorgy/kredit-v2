import { useEffect, useState } from "react";

interface SemesterSelectProps {
  onChangeSemester: (selectedSemester: string) => void;
}

function SemesterSelect({ onChangeSemester }: SemesterSelectProps) {
  const [selectedSemester, setSelectedSemester] = useState("1");

  function handleSemesterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSemester(() => event.target.value);
  }

  useEffect(() => onChangeSemester(selectedSemester), [selectedSemester]);

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
