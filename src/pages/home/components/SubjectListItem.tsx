import { useEffect, useRef, useState } from "react";
import type { Subject } from "../../../interfaces/Subject";

interface SubjectListItemProps {
  subject: Subject;
  onUpdateSubject: (subjectId: string, subject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
}

function SubjectListItem({
  subject,
  onUpdateSubject,
  onDeleteSubject,
}: SubjectListItemProps) {
  const [subjectState, setSubjectState] = useState(subject);
  const initialRender = useRef(true);

  function handleCompletedChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSubjectState((s) => ({ ...s, completed: event.target.checked }));
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSubjectState((s) => ({ ...s, name: event.target.value }));
  }

  function handleCreditChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSubjectState((s) => ({
      ...s,
      credit: Number(event.target.value),
    }));
  }

  function handleGradeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSubjectState((s) => ({
      ...s,
      grade: Number(event.target.value),
    }));
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    onUpdateSubject(subject.id, subjectState);
  }, [subjectState]);

  return (
    <>
      <div>{subjectState.id}</div>
      <input
        type="checkbox"
        checked={subjectState.completed}
        onChange={handleCompletedChange}
      />
      <input
        type="text"
        value={subjectState.name}
        onChange={handleNameChange}
      />
      <input
        type="number"
        min={0}
        value={subjectState.credit.toString()}
        onChange={handleCreditChange}
      />
      <input
        type="number"
        min={1}
        max={5}
        value={subjectState.grade.toString()}
        onChange={handleGradeChange}
      />
      <input
        type="button"
        value="Delete"
        onClick={() => onDeleteSubject(subject.id)}
      />
    </>
  );
}
export default SubjectListItem;
