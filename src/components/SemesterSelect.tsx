import { useEffect, useState } from "react";
import type { Subject } from "../interfaces/subject";
import type StorageService from "../services/StorageService";

interface SemesterSelectProps {
  storageService: StorageService;
  replaceSubjects: (subjects: Subject[]) => void;
}

function SemesterSelect({
  storageService,
  replaceSubjects,
}: SemesterSelectProps) {
  const [selectedSemester, setSelectedSemester] = useState("1");

  function handleSemesterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSemester(() => event.target.value);
  }

  useEffect(() => {
    replaceSubjects(storageService.loadSemesterSubjects(selectedSemester));
  }, [selectedSemester]);

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
