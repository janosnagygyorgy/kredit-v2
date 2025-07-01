import { useState } from "react";
import type { Subject } from "../interfaces/subject";
import SubjectListItem from "./SubjectListItem";
import { v4 } from "uuid";

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
  const [inputCompleted, setInputCompleted] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputCredit, setInputCredit] = useState("3");
  const [inputGrade, setInputGrade] = useState("5");
  return (
    <ul>
      <li>
        <input
          type="checkbox"
          checked={inputCompleted}
          onChange={(event) => setInputCompleted(event.target.checked)}
        />
        <input
          type="text"
          value={inputName}
          onChange={(event) => setInputName(event.target.value)}
        />
        <input
          type="number"
          min={0}
          value={inputCredit}
          onChange={(event) => setInputCredit(event.target.value)}
        />
        <input
          type="number"
          min={1}
          max={5}
          value={inputGrade}
          onChange={(event) => setInputGrade(event.target.value)}
        />
        <input
          type="button"
          value="Add"
          onClick={() => {
            onAddSubject({
              id: v4(),
              completed: inputCompleted,
              name: inputName,
              credit: Number(inputCredit),
              grade: Number(inputGrade),
            });
          }}
        />
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
