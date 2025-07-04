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
    storageService.getSelectedSemester() ?? Object.keys(data)[0]
  );
  const subjects = data[selectedSemester];
  const date = new Date();
  const defaultSemesterName =
    date.getFullYear() + "/" + (date.getMonth() < 7 ? "2" : "1");

  useEffect(() => {
    storageService.saveData(data, selectedSemester);
  }, [data]);

  calculatorService.load(data, selectedSemester);

  function addSemester(newSemester: string): void {
    if (newSemester.length < 1 || newSemester.split(" ").length > 1) {
      alert("Érvénytelen félév név.");
      return;
    }
    setData((d) => ({ ...d, [newSemester]: [] }));
    changeSemester(newSemester);
  }

  function changeSemester(selectedSemester: string): void {
    setSelectedSemester(() => selectedSemester);
  }

  function deleteSemester(semesterToDelete: string): void {
    const newData: StoredData = Object.keys(data)
      .filter((key) => key != semesterToDelete)
      .reduce((accObj, key) => {
        accObj[key] = data[key];
        return accObj;
      }, {} as StoredData);
    setData(() => newData);
    if (Object.keys(newData).length === 0) {
      console.log("No semesters left");
      addSemester(defaultSemesterName);
    } else changeSemester(Object.keys(newData)[0]);
  }

  function addSubject(subject: Subject): void {
    if (subject.credit < 0 || subject.grade < 1 || subject.grade > 5) {
      return;
    }
    setData((d) => ({
      ...d,
      [selectedSemester]: [subject, ...subjects],
    }));
  }

  function updateSubject(subjectId: string, subject: Subject): void {
    if (subject.credit < 0 || subject.grade < 1 || subject.grade > 5) {
      return;
    }
    setData((d) => ({
      ...d,
      [selectedSemester]: subjects.map((item) =>
        item.id === subjectId ? subject : item
      ),
    }));
  }

  function deleteSubject(subjectId: string): void {
    setData((d) => ({
      ...d,
      [selectedSemester]: subjects.filter(
        (subject) => subject.id !== subjectId
      ),
    }));
  }

  return (
    <>
      <h1>Kreditindex kalkulátor</h1>
      <SemesterSelect
        options={Object.keys(data)}
        selectedSemester={selectedSemester}
        onAddSemester={addSemester}
        onChangeSelectedSemester={changeSemester}
        onDeleteSemester={deleteSemester}
      />
      <SubjectList
        subjects={data[selectedSemester]}
        onAddSubject={addSubject}
        onUpdateSubject={updateSubject}
        onDeleteSubject={deleteSubject}
      />
      <StatisticsDisplay calculatorService={calculatorService} />
    </>
  );
}

export default Home;
