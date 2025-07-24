import { useState } from "react";
import { v4 } from "uuid";
import type { Subject } from "interfaces/Subject";

interface SubjectListInputProps {
  onAddSubject: (subject: Subject) => void;
}

function SubjectListInput({ onAddSubject }: SubjectListInputProps) {
  const [inputCompleted, setInputCompleted] = useState(true);
  const [inputName, setInputName] = useState("");
  const [inputCredit, setInputCredit] = useState(3);
  const [inputGrade, setInputGrade] = useState(5);

  return (
    <div className="flex items-center p-1 my-4 border-solid border-1 rounded-md bg-shadow cursor-grab active:cursor-grabbing">
      <input
        type="checkbox"
        checked={inputCompleted}
        onChange={(event) => setInputCompleted(event.target.checked)}
      />
      <input
        type="text"
        value={inputName}
        className="w-full"
        onChange={(event) => setInputName(event.target.value)}
      />
      <input
        type="number"
        min={0}
        value={inputCredit.toString()}
        className="w-8"
        onChange={(event) => setInputCredit(Number(event.target.value))}
      />
      <input
        type="number"
        min={1}
        max={5}
        value={inputGrade.toString()}
        className="w-8"
        onChange={(event) => setInputGrade(Number(event.target.value))}
      />
      <input
        type="button"
        value="Hozzáadás"
        className="w-20"
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
    </div>
  );
}

export default SubjectListInput;
