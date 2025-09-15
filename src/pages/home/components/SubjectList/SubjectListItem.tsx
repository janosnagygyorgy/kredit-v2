import { useEffect, useRef, useState } from "react";
import type { Subject } from "interfaces/Subject";

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
    <div className="flex items-center p-1 rounded-md bg-highlight cursor-grab active:cursor-grabbing">
      <input
        type="checkbox"
        checked={subjectState.completed}
        onChange={handleCompletedChange}
      />
      <input
        type="text"
        value={subjectState.name}
        className="w-3/4 bg-shadow"
        onChange={handleNameChange}
      />
      <input
        type="number"
        min={0}
        value={subjectState.credit.toString()}
        className="w-15 bg-shadow"
        onChange={handleCreditChange}
      />
      <input
        type="number"
        min={1}
        max={5}
        value={subjectState.grade.toString()}
        className="w-10 bg-shadow"
        onChange={handleGradeChange}
      />
      <input
        type="button"
        value="Törlés"
        className="w-20 text-white border-black bg-warning"
        onClick={() => onDeleteSubject(subject.id)}
      />
    </div>
  );
}
export default SubjectListItem;
