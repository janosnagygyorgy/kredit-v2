import type { StoredData } from "../interfaces/StoredData";

class StorageService {
  public getSelectedSemester(): string {
    const selectedSemester = localStorage.getItem("selectedSemester");
    return selectedSemester ?? "1";
  }

  public getData(): StoredData {
    const data = localStorage.getItem("data");
    console.log(data);
    if (data === null) return { "1": [] };
    return JSON.parse(data);
  }

  public saveData(data: StoredData, selectedSemester: string): void {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("selectedSemester", selectedSemester);
  }
}

export default StorageService;
