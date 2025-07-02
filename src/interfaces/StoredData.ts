import type { Subject } from "./Subject";

export interface StoredData {
  [key: string]: Subject[];
}
