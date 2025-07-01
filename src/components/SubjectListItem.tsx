import { useState } from "react";
import type { Subject } from "../interfaces/subject";

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
  const [completed, setCompleted] = useState(subject.completed);
  const [name, setName] = useState(subject.name);
  const [credit, setCredit] = useState(String(subject.credit));
  const [grade, setGrade] = useState(String(subject.grade));

  function handleCompletedChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCompleted(event.target.checked);
  }
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function handleCreditChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCredit(event.target.value);
  }
  function handleGradeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGrade(event.target.value);
  }

  return (
    <>
      <div>{subject.id}</div>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCompletedChange}
      />
      <input type="text" value={name} onChange={handleNameChange} />
      <input type="number" value={credit} onChange={handleCreditChange} />
      <input
        type="number"
        min={1}
        max={5}
        value={grade}
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
