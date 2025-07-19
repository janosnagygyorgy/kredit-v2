import type { CalculatorServiceConfig } from "interfaces/CalculatorServiceConfig";
import type { StoredData } from "interfaces/StoredData";

class StorageService {
  public getSelectedSemester(): string | null {
    const selectedSemester = localStorage.getItem("selectedSemester");
    return selectedSemester;
  }

  public getData(): StoredData {
    const data = localStorage.getItem("data");
    if (!data)
      return [
        { name: "Semester1", subjects: [] },
        { name: "Semester2", subjects: [] },
      ];
    return JSON.parse(data);
  }

  public saveData(data: StoredData, selectedSemester: string): void {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("selectedSemester", selectedSemester);
    console.log(data);
  }

  public getConfig(): CalculatorServiceConfig {
    const config = localStorage.getItem("config");
    if (!config) {
      return {
        semesterTraditionalAverage: true,
        semesterWeightedAverage: true,
        semesterCreditSum: true,
        semesterCompletedCreditSum: true,
        semesterCreditIndex: true,
        semesterCorrectedCreditIndex: true,
        cumulatedTraditionalAverage: true,
        cumulatedWeightedAverage: true,
        cumulatedCompletedCreditSum: true,
        cumulatedCreditIndex: true,
        cumulatedCorrectedCreditIndex: true,
      };
    }
    return JSON.parse(config);
  }

  public saveConfig(config: CalculatorServiceConfig): void {
    localStorage.setItem("config", JSON.stringify(config));
    console.log(config);
  }
}

export default StorageService;
