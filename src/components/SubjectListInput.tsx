import { useState } from "react";
import { v4 } from "uuid";
import type { Subject } from "../interfaces/subject";

interface SubjectListInputProps {
  onAddSubject: (subject: Subject) => void;
}

function SubjectListInput({ onAddSubject }: SubjectListInputProps) {
  const [inputCompleted, setInputCompleted] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputCredit, setInputCredit] = useState("3");
  const [inputGrade, setInputGrade] = useState("5");
  return (
    <>
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
    </>
  );
}

export default SubjectListInput;
