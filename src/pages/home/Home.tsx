import type { Subject } from "interfaces/Subject";
import type { StoredData } from "interfaces/StoredData";
import type CalculatorService from "services/CalculatorService";
import SubjectList from "./components/SubjectList/SubjectList";
import StatisticsDisplay from "./components/StatisticsDisplay";
import SemesterSelect from "./components/SemesterSelect";
import { v4 } from "uuid";

interface HomeProps {
  data: StoredData;
  setData: React.Dispatch<React.SetStateAction<StoredData>>;
  selectedSemester: string;
  setSelectedSemester: React.Dispatch<React.SetStateAction<string>>;
  calculatorService: CalculatorService;
}

function Home({
  data,
  setData,
  selectedSemester,
  setSelectedSemester,
  calculatorService,
}: HomeProps) {
  const subjects =
    data.find((s) => s.name === selectedSemester)?.subjects ?? [];
  const date = new Date();
  const defaultSemesterName =
    date.getMonth() < 9
      ? `${date.getFullYear() - 1}/${date.getFullYear().toString().slice(-2)}/${
          date.getMonth() < 2 ? 1 : 2
        }`
      : `${date.getFullYear()}/${(date.getFullYear() + 1)
          .toString()
          .slice(-2)}/1`;

  //#region Semesters
  function addSemester(newSemester: string): void {
    if (newSemester.length < 1) {
      alert("Érvénytelen félév név.");
      return;
    }
    setData(
      (d) =>
        [
          ...d,
          { id: v4(), name: newSemester, included: true, subjects: [] },
        ] as StoredData
    );
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
            {
              id: v4(),
              name: defaultSemesterName,
              included: true,
              subjects: [],
            },
          ] as StoredData
      );
      changeSemester(defaultSemesterName);
    } else changeSemester(newData[0].name);
  }

  function moveSemester(fromIndex: number, toIndex: number): void {
    if (fromIndex === toIndex || toIndex - fromIndex === 1) return;
    if (fromIndex < toIndex) toIndex--;
    const newData: StoredData = data.filter((_, index) => index !== fromIndex);
    newData.splice(toIndex, 0, data[fromIndex]);
    setData(() => newData);
  }
  //#endregion Semesters

  //#region Subjects
  function toggleSemesterIncluded(semesterId: string): void {
    setData(
      (d) =>
        d.map((s) =>
          s.id === semesterId ? { ...s, included: !s.included } : s
        ) as StoredData
    );
  }

  function onUpdateSemesterName(semesterId: string, name: string): void {
    setData(
      (d) =>
        d.map((s) =>
          s.id === semesterId ? { ...s, name: name } : s
        ) as StoredData
    );
  }

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

  function moveSubject(fromIndex: number, toIndex: number): void {
    if (fromIndex === toIndex || toIndex - fromIndex === 1) return;
    if (fromIndex < toIndex) toIndex--;
    const newSubjects: Subject[] = [...subjects].filter(
      (_, index) => index !== fromIndex
    );
    newSubjects.splice(toIndex, 0, subjects[fromIndex]);
    updateSemesterSubjects(newSubjects);
  }
  //#endregion Subjects

  return (
    <>
      <SemesterSelect
        options={data.map((s) => s)}
        selectedSemester={selectedSemester}
        onAddSemester={addSemester}
        onChangeSelectedSemester={changeSemester}
        onToggleSemesterIncluded={toggleSemesterIncluded}
        onUpdateSemesterName={onUpdateSemesterName}
        onDeleteSemester={deleteSemester}
        onMoveSemester={moveSemester}
      />
      <div className="flex flex-wrap mt-5">
        <SubjectList
          subjects={subjects}
          onAddSubject={addSubject}
          onUpdateSubject={updateSubject}
          onDeleteSubject={deleteSubject}
          onMoveSubject={moveSubject}
        />
        <StatisticsDisplay calculatorService={calculatorService} />
      </div>
    </>
  );
}

export default Home;
