import type { Semester } from "interfaces/Semester";
import { useEffect, useRef, useState } from "react";

interface SemesterListItemProps {
  semester: Semester;
  isSelected: boolean;
  onChangeSelectedSemester: (semester: string) => void;
  onToggleSemesterIncluded: (semesterId: string) => void;
  onUpdateSemesterName: (semesterId: string, name: string) => void;
}

function SemesterListItem({
  semester,
  isSelected,
  onChangeSelectedSemester,
  onToggleSemesterIncluded,
  onUpdateSemesterName,
}: SemesterListItemProps) {
  const [semesterName, setSemesterName] = useState(semester.name);
  const initialRender = useRef(true);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSemesterName(() => event.target.value);
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    onUpdateSemesterName(semester.id, semesterName);
  }, [semesterName]);

  return (
    <div
      onClick={(e) => {
        if (!(e.target instanceof HTMLInputElement))
          onChangeSelectedSemester(semester.id);
      }}
      className={`flex items-center p-1 rounded-sm cursor-pointer active:cursor-grabbing ${
        isSelected ? "bg-primary text-link-text" : "bg-highlight"
      }`}
    >
      <input
        type="checkbox"
        checked={semester.included}
        onChange={() => {
          onToggleSemesterIncluded(semester.id);
        }}
      />
      <input type="text" value={semesterName} onChange={handleNameChange} />
    </div>
  );
}

export default SemesterListItem;
