import type { CalculatorServiceConfig } from "interfaces/CalculatorServiceConfig";
import type { CalculatorServiceConfigItem } from "interfaces/CalculatorServiceConfigItem";
import type { StoredConfig } from "interfaces/StoredConfig";
import type { StoredData } from "interfaces/StoredData";
import type { Subject } from "interfaces/Subject";

class CalculatorService {
  private data: StoredData;
  private selectedSemester: string;
  public readonly config: CalculatorServiceConfig = {
    semesterStatistics: [
      {
        key: "semesterTraditionalAverage",
        enabled: true,
        text: "Hagyományos átlag",
        method: this.semesterTraditionalAverage,
      },
      {
        key: "semesterWeightedAverage",
        enabled: true,
        text: "Súlyozott átlag",
        method: this.semesterWeightedAverage,
      },
      {
        key: "semesterCreditSum",
        enabled: true,
        text: "Felvett kredit",
        method: this.semesterCreditSum,
      },
      {
        key: "semesterCompletedCreditSum",
        enabled: true,
        text: "Teljesített kredit",
        method: this.semesterCompletedCreditSum,
      },
      {
        key: "semesterCreditIndex",
        enabled: true,
        text: "Kreditindex",
        method: this.semesterCreditIndex,
      },
      {
        key: "semesterCorrectedCreditIndex",
        enabled: true,
        text: "Korrigált kreditindex",
        method: this.semesterCorrectedCreditIndex,
      },
    ],
    cumulatedStatistics: [
      {
        key: "cumulatedTraditionalAverage",
        enabled: true,
        text: "Összesített hagyományos átlag",
        method: this.cumulatedTraditionalAverage,
      },
      {
        key: "cumulatedWeightedAverage",
        enabled: true,
        text: "Összesített súlyozott átlag",
        method: this.cumulatedWeightedAverage,
      },
      {
        key: "cumulatedCompletedCreditSum",
        enabled: true,
        text: "Összes teljesített kredit",
        method: this.cumulatedCompletedCreditSum,
      },
      {
        key: "cumulatedCreditIndex",
        enabled: true,
        text: "Összesített kreditindex",
        method: this.cumulatedCreditIndex,
      },
      {
        key: "cumulatedCorrectedCreditIndex",
        enabled: true,
        text: "Összesített korrigált kreditindex",
        method: this.cumulatedCorrectedCreditIndex,
      },
    ],
  };

  public constructor(
    data: StoredData,
    selectedSemester: string,
    config: StoredConfig
  ) {
    this.data = data;
    this.selectedSemester = selectedSemester;
    Object.entries(config).forEach(([key, value]) => {
      const configItem = this.getConfigItem(key);
      if (!configItem) return;
      configItem.enabled = value;
    });
    console.log(this.config);
  }

  public getConfigItem(key: string): CalculatorServiceConfigItem | undefined {
    return Object.values(this.config)
      .flatMap((items) => items)
      .find((item) => item.key === key);
  }

  private getSemesterSubjects(semester: string): Subject[] {
    return this.data.find((s) => s.name === semester)?.subjects ?? [];
  }

  //#region Semester statistics
  //#region Sums
  public semesterGradeSum(semester: string = this.selectedSemester): number {
    return this.getSemesterSubjects(semester).reduce(
      (acc, curr) => acc + curr.grade,
      0
    );
  }

  public semesterCompletedGradeSum(
    semester: string = this.selectedSemester
  ): number {
    return this.getSemesterSubjects(semester)
      .filter((e) => e.completed && e.grade > 1)
      .reduce((acc, curr) => acc + curr.grade, 0);
  }

  public semesterCreditGradeProductSum(
    semester: string = this.selectedSemester
  ): number {
    return this.getSemesterSubjects(semester).reduce(
      (acc, curr) => acc + curr.credit * curr.grade,
      0
    );
  }

  public semesterCompletedCreditGradeProductSum(
    semester: string = this.selectedSemester
  ): number {
    return this.getSemesterSubjects(semester)
      .filter((e) => e.completed && e.grade > 1)
      .reduce((acc, curr) => acc + curr.credit * curr.grade, 0);
  }

  public semesterNumberOfSubjects(
    semester: string = this.selectedSemester
  ): number {
    return this.getSemesterSubjects(semester).length;
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
    return this.getSemesterSubjects(semester).reduce(
      (acc, curr) => acc + curr.credit,
      0
    );
  }

  // Teljesített kredit
  public semesterCompletedCreditSum(
    semester: string = this.selectedSemester
  ): number {
    return this.getSemesterSubjects(semester)
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
    let sum = 0;
    for (let i = 0; i < this.data.length; i++) {
      sum += this.semesterCreditSum(this.data[i].name);
      if (this.data[i].name === this.selectedSemester) break;
    }
    return sum;
  }

  // Összesített hagyományos átlag
  public cumulatedTraditionalAverage(): number {
    let gradeSum = 0;
    let numberOfSubjects = 0;
    for (let i = 0; i < this.data.length; i++) {
      gradeSum += this.semesterGradeSum(this.data[i].name);
      numberOfSubjects += this.semesterNumberOfSubjects(this.data[i].name);
      if (this.data[i].name === this.selectedSemester) break;
    }
    return gradeSum / numberOfSubjects;
  }

  // Összesített súlyozott átlag
  public cumulatedWeightedAverage(): number {
    let creditGradeProductSum = 0;
    let completedCreditSum = 0;
    for (let i = 0; i < this.data.length; i++) {
      creditGradeProductSum += this.semesterCompletedCreditGradeProductSum(
        this.data[i].name
      );
      completedCreditSum += this.semesterCompletedCreditSum(this.data[i].name);
      if (this.data[i].name === this.selectedSemester) break;
    }
    return creditGradeProductSum / completedCreditSum;
  }

  // Összes teljesített kredit
  public cumulatedCompletedCreditSum(): number {
    let sum = 0;
    for (let i = 0; i < this.data.length; i++) {
      sum += this.semesterCompletedCreditSum(this.data[i].name);
      if (this.data[i].name === this.selectedSemester) break;
    }
    return sum;
  }

  // Összesített kreditindex
  public cumulatedCreditIndex(): number {
    let creditGradeProductSum = 0;
    let semesterCounter = 0;
    for (let i = 0; i < this.data.length; i++) {
      semesterCounter++;
      creditGradeProductSum += this.semesterCompletedCreditGradeProductSum(
        this.data[i].name
      );
      if (this.data[i].name === this.selectedSemester) break;
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
