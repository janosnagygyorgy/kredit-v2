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
  public cumulatedCreditSum(): number {
    const semesters = Object.keys(this.data);
    let sum = 0;
    for (let i = 0; i < semesters.length; i++) {
      sum += this.semesterCreditSum(semesters[i]);
      if (semesters[i] === this.selectedSemester) break;
    }
    return sum;
  }

  // Összesített hagyományos átlag
  public cumulatedTraditionalAverage(): number {
    const semesters = Object.keys(this.data);
    let gradeSum = 0;
    let numberOfSubjects = 0;
    for (let i = 0; i < semesters.length; i++) {
      gradeSum += this.semesterGradeSum(semesters[i]);
      numberOfSubjects += this.semesterNumberOfSubjects(semesters[i]);
      if (semesters[i] === this.selectedSemester) break;
    }
    return gradeSum / numberOfSubjects;
  }

  // Összesített súlyozott átlag
  public cumulatedWeightedAverage(): number {
    const semesters = Object.keys(this.data);
    let creditGradeProductSum = 0;
    let completedCreditSum = 0;
    for (let i = 0; i < semesters.length; i++) {
      creditGradeProductSum += this.semesterCompletedCreditGradeProductSum(
        semesters[i]
      );
      completedCreditSum += this.semesterCompletedCreditSum(semesters[i]);
      if (semesters[i] === this.selectedSemester) break;
    }
    return creditGradeProductSum / completedCreditSum;
  }

  // Összes teljesített kredit
  public cumulatedCompletedCreditSum(): number {
    const semesters = Object.keys(this.data);
    let sum = 0;
    for (let i = 0; i < semesters.length; i++) {
      sum += this.semesterCompletedCreditSum(semesters[i]);
      if (semesters[i] === this.selectedSemester) break;
    }
    return sum;
  }

  // Összesített kreditindex
  public cumulatedCreditIndex(): number {
    const semesters = Object.keys(this.data);
    let creditGradeProductSum = 0;
    let semesterCounter = 0;
    for (let i = 0; i < semesters.length; i++) {
      semesterCounter++;
      creditGradeProductSum += this.semesterCompletedCreditGradeProductSum(
        semesters[i]
      );
      if (semesters[i] === this.selectedSemester) break;
    }
    return creditGradeProductSum / (semesterCounter * 30);
  }

  // Összesített korrigált kreditindex
  public cumulatedCorrectedCreditIndex(): number {
    return (
      this.cumulatedCreditIndex() *
      (this.cumulatedCompletedCreditSum() / this.cumulatedCreditSum())
    );
  }

  //#endregion Cumulated statistics
}

export default CalculatorService;
