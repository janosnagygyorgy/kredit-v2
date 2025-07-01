import { useState } from "react";
import type { Subject } from "../interfaces/subject";
import SubjectListItem from "../components/SubjectListItem";
import { v4 } from "uuid";

function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [inputCompleted, setInputCompleted] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputCredit, setInputCredit] = useState("3");
  const [inputGrade, setInputGrade] = useState("5");

  function addSubject() {
    const newSubject: Subject = {
      id: v4(),
      completed: inputCompleted,
      name: inputName,
      credit: Number(inputCredit),
      grade: Number(inputGrade),
    };
    setSubjects((s) => [newSubject, ...s]);
  }

  function updateSubject(subjectId: string, subject: Subject) {
    if (subject.credit < 0 || subject.grade < 1 || subject.grade > 5) {
      alert("Can not modify subject.");
      return;
    }
    setSubjects((s) =>
      s.map((item) => (item.id === subjectId ? subject : item))
    );
  }

  function deleteSubject(subjectId: string) {
    setSubjects((s) => s.filter((subject) => subject.id !== subjectId));
  }

  return (
    <>
      <h1>Kreditindex kalkulátor</h1>
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
          <input type="button" value="Add" onClick={addSubject} />
        </li>
        {subjects.map((subject) => (
          <li key={subject.id}>
            <SubjectListItem
              subject={subject}
              onUpdateSubject={updateSubject}
              onDeleteSubject={deleteSubject}
            />
          </li>
        ))}
      </ul>
      <div>
        Kreditek száma:
        {subjects.reduce((acc, curr) => acc + curr.credit, 0)}
      </div>
    </>
  );
}

export default Home;
