import { useState } from "react";
import type { Subject } from "../interfaces/subject";
import type CalculatorService from "../services/CalculatorService";
import SubjectList from "../components/SubjectList";
import StatisticsDisplay from "../components/StatisticsDisplay";

interface HomeProps {
  calculatorService: CalculatorService;
}

function Home({ calculatorService }: HomeProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  calculatorService.load(subjects);

  function addSubject(subject: Subject) {
    setSubjects((s) => [subject, ...s]);
  }

  function updateSubject(subjectId: string, subject: Subject) {
    if (subject.credit < 0 || subject.grade < 1 || subject.grade > 5) {
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
      <SubjectList
        subjects={subjects}
        onAddSubject={addSubject}
        onUpdateSubject={updateSubject}
        onDeleteSubject={deleteSubject}
      />
      <StatisticsDisplay calculatorService={calculatorService} />
    </>
  );
}

export default Home;
