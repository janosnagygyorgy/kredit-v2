import { v4 } from "uuid";
import type { Subject } from "../interfaces/subject";

class StorageService {
  public loadSemesterSubjects(semester: string): Subject[] {
    switch (semester) {
      case "1":
        return [
          {
            id: v4(),
            completed: true,
            name: "Test1",
            credit: 1,
            grade: 1,
          },
        ];
      case "2":
        return [
          {
            id: v4(),
            completed: true,
            name: "Test2",
            credit: 2,
            grade: 2,
          },
        ];
      case "3":
        return [
          {
            id: v4(),
            completed: true,
            name: "Test3",
            credit: 3,
            grade: 3,
          },
        ];
      default:
        return [];
    }
  }

  public saveSemesterSubjects(semester: string, subjects: Subject[]): void {
    console.log(semester, subjects);
  }
}

export default StorageService;
