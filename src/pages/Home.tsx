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
    storageService.getSelectedSemester() ?? data[0].name
  );
  const subjects =
    data.find((s) => s.name === selectedSemester)?.subjects ?? [];
  const date = new Date();
  const defaultSemesterName =
    date.getFullYear() + "/" + (date.getMonth() < 7 ? "2" : "1");

  useEffect(() => {
    storageService.saveData(data, selectedSemester);
  }, [data, selectedSemester]);

  calculatorService.load(data, selectedSemester);

  //#region Semesters
  function addSemester(newSemester: string): void {
    if (newSemester.length < 1 || newSemester.split(" ").length > 1) {
      alert("Érvénytelen félév név.");
      return;
    }
    if (data.find((s) => s.name === newSemester)) {
      alert("Már létezik ilyen félév.");
      return;
    }
    setData((d) => [...d, { name: newSemester, subjects: [] }] as StoredData);
    changeSemester(newSemester);
  }

  function changeSemester(semester: string): void {
    setSelectedSemester(() => semester);
  }

  function deleteSemester(semesterToDelete: string): void {
    const newData: StoredData = data.filter((s) => s.name !== semesterToDelete);
    setData(() => newData);
    if (newData.length === 0) {
      console.log("No semesters left");
      setData(
        () =>
          [
            ...newData,
            { name: defaultSemesterName, subjects: [] },
          ] as StoredData
      );
      changeSemester(defaultSemesterName);
    } else changeSemester(newData[0].name);
  }

  function swapSemesters(semester1: string, semester2: string): void {
    const newData: StoredData = [...data];

    const semester1Index = newData.findIndex((s) => s.name === semester1);
    const semester2Index = newData.findIndex((s) => s.name === semester2);

    //TODO: check indexes

    [newData[semester1Index], newData[semester2Index]] = [
      newData[semester2Index],
      newData[semester1Index],
    ];

    setData(() => newData);
  }

  function moveSemester(fromIndex: number, toIndex: number): void {
    const newData: StoredData = data.filter((_, index) => index !== fromIndex);
    newData.splice(toIndex, 0, data[fromIndex]);
    setData(() => newData);
  }

  //#endregion Semesters

  //#region Subjects
  function updateSemesterSubjects(
    subjects: Subject[],
    semester: string = selectedSemester
  ): void {
    setData(
      (d) =>
        d.map((s) =>
          s.name === semester ? { ...s, subjects: subjects } : s
        ) as StoredData
    );
  }

  function addSubject(subject: Subject): void {
    if (subject.credit < 0 || subject.grade < 1 || subject.grade > 5) {
      return;
    }
    updateSemesterSubjects([subject, ...subjects]);
  }

  function updateSubject(subjectId: string, subject: Subject): void {
    if (subject.credit < 0 || subject.grade < 1 || subject.grade > 5) {
      return;
    }
    updateSemesterSubjects(
      subjects.map((item) => (item.id === subjectId ? subject : item))
    );
  }

  function deleteSubject(subjectId: string): void {
    updateSemesterSubjects(subjects.filter((item) => item.id !== subjectId));
  }
  //#endregion Subjects

  return (
    <>
      <h1>Kreditindex kalkulátor</h1>
      <button onClick={() => swapSemesters("2022/23/1", "2024/25/2")}>
        Csere
      </button>
      <SemesterSelect
        options={data.map((s) => s.name)}
        selectedSemester={selectedSemester}
        onAddSemester={addSemester}
        onChangeSelectedSemester={changeSemester}
        onDeleteSemester={deleteSemester}
        onMoveSemester={moveSemester}
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
