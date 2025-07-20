import type { StoredData } from "interfaces/StoredData";
import type CalculatorService from "services/CalculatorService";
import CalculationSettings from "./components/CalculationSettings";
import ImportExport from "./components/ImportExport";

interface SettingsProps {
  data: StoredData;
  onImport: (data: StoredData) => void;
  calculatorService: CalculatorService;
  toggleSetting: (setting: string) => void;
}

function Settings({
  data,
  onImport,
  calculatorService,
  toggleSetting,
}: SettingsProps) {
  return (
    <>
      <h1>Beállítások</h1>
      <CalculationSettings
        calculatorService={calculatorService}
        toggleSetting={toggleSetting}
      />
      <ImportExport data={data} onImport={onImport} />
    </>
  );
}

export default Settings;
