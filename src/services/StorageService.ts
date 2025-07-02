import { v4 } from "uuid";
import type { StoredData } from "../interfaces/StoredData";

class StorageService {
  private data: StoredData = {
    1: [
      {
        id: v4(),
        completed: true,
        name: "Test1",
        credit: 1,
        grade: 1,
      },
    ],
    2: [
      {
        id: v4(),
        completed: true,
        name: "Test2",
        credit: 2,
        grade: 2,
      },
    ],
    3: [
      {
        id: v4(),
        completed: true,
        name: "Test3",
        credit: 3,
        grade: 3,
      },
    ],
  };

  public getData(): StoredData {
    return this.data;
  }

  public saveData(data: StoredData): void {
    this.data = data;
    console.log(this.data);
  }
}

export default StorageService;
