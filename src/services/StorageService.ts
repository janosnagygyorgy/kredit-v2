import type { StoredData } from "../interfaces/StoredData";

class StorageService {
  public getSelectedSemester(): string | null {
    const selectedSemester = localStorage.getItem("selectedSemester");
    return selectedSemester;
  }

  public getData(): StoredData {
    const data = localStorage.getItem("data");
    if (data === null)
      return [
        { name: "A", subjects: [] },
        { name: "B", subjects: [] },
        { name: "C", subjects: [] },
      ];
    return JSON.parse(data);
  }

  public saveData(data: StoredData, selectedSemester: string): void {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("selectedSemester", selectedSemester);
    console.log(data);
  }
}

export default StorageService;
