import { useEffect, useState } from "react";
import type { Subject } from "../interfaces/Subject";
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
  const [data, setData] = useState(storageService.getData());
  const [selectedSemester, setSelectedSemester] = useState(
    storageService.getSelectedSemester()
  );
  const [subjects, setSubjects] = useState(data[selectedSemester]);

  useEffect(() => {
    const newData = { ...data };
    newData[selectedSemester] = subjects;
    setData(() => newData);
    storageService.saveData(newData);
  }, [subjects]);

  calculatorService.load(data, selectedSemester);

  function changeSemester(selectedSemester: string) {
    setSelectedSemester(() => selectedSemester);
    setSubjects(() => data[selectedSemester]);
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

  return (
    <>
      <h1>Kreditindex kalkulátor</h1>
      <SemesterSelect
        selectedSemester={selectedSemester}
        onChangeSelectedSemester={changeSemester}
      />
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
