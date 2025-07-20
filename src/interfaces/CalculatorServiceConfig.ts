import type { CalculatorServiceConfigItem } from "./CalculatorServiceConfigItem";

export interface CalculatorServiceConfig {
  [key: string]: CalculatorServiceConfigItem[];
}
