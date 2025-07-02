import { useEffect, useState } from "react";
import type { Subject } from "../interfaces/Subject";
import type CalculatorService from "../services/CalculatorService";
import type StorageService from "../services/StorageService";
import SubjectList from "../components/SubjectList";
import StatisticsDisplay from "../components/StatisticsDisplay";
import SemesterSelect from "../components/SemesterSelect";
import type { StoredData } from "../interfaces/StoredData";

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
    storageService.saveData(newData, selectedSemester);
  }, [subjects]);

  calculatorService.load(data, selectedSemester);

  function changeSemester(selectedSemester: string): void {
    setSelectedSemester(() => selectedSemester);
    setSubjects(() => data[selectedSemester]);
  }

  function deleteSemester(semesterToDelete: string): void {
    const newData: StoredData = Object.keys(data)
      .filter((key) => key != semesterToDelete)
      .reduce((accObj, key) => {
        accObj[key] = data[key];
        return accObj;
      }, {} as StoredData);
    setData(() => newData);
    changeSemester(Object.keys(newData)[0]); // TODO: handle empty data
  }

  function addSubject(subject: Subject): void {
    if (subject.credit < 0 || subject.grade < 1 || subject.grade > 5) {
      return;
    }
    setSubjects((s) => [subject, ...s]);
  }

  function updateSubject(subjectId: string, subject: Subject): void {
    if (subject.credit < 0 || subject.grade < 1 || subject.grade > 5) {
      return;
    }
    setSubjects((s) =>
      s.map((item) => (item.id === subjectId ? subject : item))
    );
  }

  function deleteSubject(subjectId: string): void {
    setSubjects((s) => s.filter((subject) => subject.id !== subjectId));
  }

  return (
    <>
      <h1>Kreditindex kalkulátor</h1>
      <SemesterSelect
        options={Object.keys(data)}
        selectedSemester={selectedSemester}
        onChangeSelectedSemester={changeSemester}
        onDeleteSemester={deleteSemester}
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
