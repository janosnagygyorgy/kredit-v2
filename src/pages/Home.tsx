import { useEffect, useState } from "react";
import type { Subject } from "../interfaces/subject";
import type CalculatorService from "../services/CalculatorService";
import type StorageService from "../services/StorageService";
import SubjectList from "../components/SubjectList";
import StatisticsDisplay from "../components/StatisticsDisplay";
import SemesterSelect from "../components/SemesterSelect";

interface HomeProps {
  calculatorService: CalculatorService;
  storageService: StorageService;
}

function Home({ calculatorService, storageService }: HomeProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  calculatorService.load(subjects);

  function changeSemester(selectedSemester: string) {
    setSubjects(storageService.loadSemesterSubjects(selectedSemester));
  }

  function addSubject(subject: Subject) {
    if (subject.credit < 0 || subject.grade < 1 || subject.grade > 5) {
      return;
    }
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

  useEffect(() => {
    // storageService.saveSemesterSubjects(selectedSemester,subjects)
  }, [subjects]);

  return (
    <>
      <h1>Kreditindex kalkulátor</h1>
      <SemesterSelect onChangeSemester={changeSemester} />
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
