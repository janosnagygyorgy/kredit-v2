import type { Subject } from "../interfaces/subject";
import SubjectListItem from "./SubjectListItem";
import SubjectListInput from "./SubjectListInput";

interface SubjectListProps {
  subjects: Subject[];
  onAddSubject: (subject: Subject) => void;
  onUpdateSubject: (subjectId: string, subject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
}

function SubjectList({
  subjects,
  onAddSubject,
  onUpdateSubject,
  onDeleteSubject,
}: SubjectListProps) {
  return (
    <ul>
      <li>
        <SubjectListInput onAddSubject={onAddSubject} />
      </li>
      {subjects.map((subject) => (
        <li key={subject.id}>
          <SubjectListItem
            subject={subject}
            onUpdateSubject={onUpdateSubject}
            onDeleteSubject={onDeleteSubject}
          />
        </li>
      ))}
    </ul>
  );
}

export default SubjectList;
