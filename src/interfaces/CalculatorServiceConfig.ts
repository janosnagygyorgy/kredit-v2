import type { CalculatorServiceConfigItem } from "./CalculatorServiceConfigItem";

export type CalculatorServiceConfig = {
  [key: string]: CalculatorServiceConfigItem[];
};
