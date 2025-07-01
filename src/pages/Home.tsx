import { useState } from "react";
import type { Subject } from "../interfaces/subject";
import SubjectListItem from "../components/SubjectListItem";
import { v4 } from "uuid";

function Home() {
  const exampleSubjects: Subject[] = [
    {
      id: v4(),
      completed: true,
      name: "Mathematics",
      credit: 1,
      grade: 3,
    },
    {
      id: v4(),
      completed: false,
      name: "English",
      credit: 2,
      grade: 4,
    },
    {
      id: v4(),
      completed: true,
      name: "Physics",
      credit: 3,
      grade: 5,
    },
  ];
  const [subjects, setSubjects] = useState<Subject[]>(exampleSubjects);

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
    </>
  );
}

export default Home;
