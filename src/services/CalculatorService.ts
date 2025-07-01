import type { Subject } from "../interfaces/subject";

class CalculatorService {
  private subjects: Subject[] = [];

  public load(subjects: Subject[]): void {
    this.subjects = subjects;
  }

  public creditSum(): number {
    return this.subjects.reduce((acc, curr) => acc + curr.credit, 0);
  }

  public gradeSum(): number {
    return this.subjects.reduce((acc, curr) => acc + curr.grade, 0);
  }
}

export default CalculatorService;
