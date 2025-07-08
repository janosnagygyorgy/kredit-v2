import type { StoredData } from "../interfaces/StoredData";

class CalculatorService {
  private data: StoredData = {};
  private selectedSemester: string = "";

  public load(data: StoredData, selectedSemester: string): void {
    this.data = data;
    this.selectedSemester = selectedSemester;
  }

  //#region Semester statistics
  //#region Sums
  public semesterGradeSum(semester: string = this.selectedSemester): number {
    return this.data[semester].reduce((acc, curr) => acc + curr.grade, 0);
  }

  public semesterCompletedGradeSum(
    semester: string = this.selectedSemester
  ): number {
    return this.data[semester]
      .filter((e) => e.completed && e.grade > 1)
      .reduce((acc, curr) => acc + curr.grade, 0);
  }

  public semesterCreditGradeProductSum(
    semester: string = this.selectedSemester
  ): number {
    return this.data[semester].reduce(
      (acc, curr) => acc + curr.credit * curr.grade,
      0
    );
  }

  public semesterCompletedCreditGradeProductSum(
    semester: string = this.selectedSemester
  ): number {
    return this.data[semester]
      .filter((e) => e.completed && e.grade > 1)
      .reduce((acc, curr) => acc + curr.credit * curr.grade, 0);
  }

  public semesterNumberOfSubjects(
    semester: string = this.selectedSemester
  ): number {
    return this.data[semester].length;
  }
  //#endregion Sums

  // Hagyományos átlag
  public semesterTraditionalAverage(): number {
    return this.semesterGradeSum() / this.semesterNumberOfSubjects();
  }

  // Súlyozott átlag
  public semesterWeightedAverage(): number {
    return (
      this.semesterCompletedCreditGradeProductSum() /
      this.semesterCompletedCreditSum()
    );
  }

  // Felvett kredit
  public semesterCreditSum(semester: string = this.selectedSemester): number {
    return this.data[semester].reduce((acc, curr) => acc + curr.credit, 0);
  }

  // Teljesített kredit
  public semesterCompletedCreditSum(
    semester: string = this.selectedSemester
  ): number {
    return this.data[semester]
      .filter((e) => e.completed && e.grade > 1)
      .reduce((acc, curr) => acc + curr.credit, 0);
  }

  // Kreditindex
  public semesterCreditIndex(): number {
    return this.semesterCompletedCreditGradeProductSum() / 30;
  }

  // Korrigált kreditindex
  public semesterCorrectedCreditIndex(): number {
    return (
      this.semesterCreditIndex() *
      (this.semesterCompletedCreditSum() / this.semesterCreditSum())
    );
  }
  //#endregion Semester statistics

  //#region Cumulated statistics
  // Összesített hagyományos átlag
  // Összesített súlyozott átlag
  // Összesített kreditindex
  // Összesített korrigált kreditindex
  // Összes teljesített kredit
  //#endregion Cumulated statistics
}

export default CalculatorService;
