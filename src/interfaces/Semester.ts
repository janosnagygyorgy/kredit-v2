import type { Subject } from "./Subject";

export type Semester = {
  id: string;
  name: string;
  included: boolean;
  subjects: Subject[];
};
