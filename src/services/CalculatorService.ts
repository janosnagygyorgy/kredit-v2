import type { StoredData } from "../interfaces/StoredData";

class CalculatorService {
  private data: StoredData = {};
  private selectedSemester: string = "";

  public load(data: StoredData, selectedSemester: string): void {
    this.data = data;
    this.selectedSemester = selectedSemester;
  }

  public creditSum(): number {
    return this.data[this.selectedSemester].reduce(
      (acc, curr) => acc + curr.credit,
      0
    );
  }

  public gradeSum(): number {
    return this.data[this.selectedSemester].reduce(
      (acc, curr) => acc + curr.grade,
      0
    );
  }
}

export default CalculatorService;
