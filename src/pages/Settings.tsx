import type CalculatorService from "../services/CalculatorService";

interface SettingsProps {
  calculatorService: CalculatorService;
}

function Settings({ calculatorService }: SettingsProps) {
  return (
    <>
      <h1>Beállítások</h1>
    </>
  );
}

export default Settings;
