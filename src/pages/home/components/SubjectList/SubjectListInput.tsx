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
    <div className="w-full p-1 mb-2 border-solid border-1 rounded-md bg-highlight">
      <table className="w-full">
        <tbody>
          <tr>
            <th className="w-1 text-start px-0.5"></th>
            <th className="text-start px-0.5">Tárgy</th>
            <th className="w-15 text-start px-0.5">Kredit</th>
            <th className="w-10 text-start px-0.5">Jegy</th>
            <th className="w-20 text-start px-0.5"></th>
          </tr>
          <tr>
            <td className="px-0.5">
              <input
                type="checkbox"
                checked={inputCompleted}
                onChange={(event) => setInputCompleted(event.target.checked)}
              />
            </td>
            <td className="px-0.5">
              <input
                type="text"
                value={inputName}
                className="w-full bg-shadow"
                onChange={(event) => setInputName(event.target.value)}
              />
            </td>
            <td className="px-0.5">
              <input
                type="number"
                min={0}
                value={inputCredit.toString()}
                className="w-full bg-shadow"
                onChange={(event) => setInputCredit(Number(event.target.value))}
              />
            </td>
            <td className="px-0.5">
              <input
                type="number"
                min={1}
                max={5}
                value={inputGrade.toString()}
                className="w-full bg-shadow"
                onChange={(event) => setInputGrade(Number(event.target.value))}
              />
            </td>
            <td className="px-0.5">
              <input
                type="button"
                value="Hozzáadás"
                className="w-full bg-success text-white"
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SubjectListInput;
