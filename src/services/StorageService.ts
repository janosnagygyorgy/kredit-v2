import type { StoredConfig } from "interfaces/StoredConfig";
import type { StoredData } from "interfaces/StoredData";
import { v4 } from "uuid";

class StorageService {
  public getSelectedSemester(): string | null {
    return localStorage.getItem("selectedSemester");
  }

  public getData(): StoredData {
    const data = localStorage.getItem("data");
    const date = new Date();
    const defaultSemesterName =
      date.getMonth() < 8
        ? `${date.getFullYear() - 1}/${date
            .getFullYear()
            .toString()
            .slice(-2)}/${date.getMonth() < 1 ? 1 : 2}`
        : `${date.getFullYear()}/${(date.getFullYear() + 1)
            .toString()
            .slice(-2)}/1`;
    if (!data)
      return [
        { id: v4(), name: defaultSemesterName, included: true, subjects: [] },
      ];

    return JSON.parse(data);
  }

  public saveData(data: StoredData, selectedSemester: string): void {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("selectedSemester", selectedSemester);
  }

  public getConfig(): StoredConfig {
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

  public saveConfig(config: StoredConfig): void {
    localStorage.setItem("config", JSON.stringify(config));
  }
}

export default StorageService;
