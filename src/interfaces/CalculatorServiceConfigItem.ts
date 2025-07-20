export type CalculatorServiceConfigItem = {
  key: string;
  enabled: boolean;
  text: string;
  method: () => number;
};
