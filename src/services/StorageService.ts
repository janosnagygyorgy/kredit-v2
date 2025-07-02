import type { StoredData } from "../interfaces/StoredData";

class StorageService {
  public getSelectedSemester(): string {
    const selectedSemester = localStorage.getItem("selectedSemester");
    return selectedSemester ?? "1";
  }

  public getData(): StoredData {
    const data = localStorage.getItem("data");
    if (data === null) return { "1": [], "2": [], "3": [] };
    return JSON.parse(data);
  }

  public saveData(data: StoredData, selectedSemester: string): void {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("selectedSemester", selectedSemester);
    console.log(data);
  }
}

export default StorageService;
