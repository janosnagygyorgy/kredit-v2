import ImportExport from "./components/ImportExport";
import type { CalculatorServiceConfig } from "interfaces/CalculatorServiceConfig";
import type { StoredData } from "interfaces/StoredData";
import CalculationSettings from "./components/CalculationSettings";

interface SettingsProps {
  data: StoredData;
  onImport: (data: StoredData) => void;
  config: CalculatorServiceConfig;
  toggleSetting: (setting: string) => void;
}

function Settings({ data, onImport, config, toggleSetting }: SettingsProps) {
  return (
    <>
      <h1>Beállítások</h1>
      <CalculationSettings config={config} toggleSetting={toggleSetting} />
      <ImportExport data={data} onImport={onImport} />
    </>
  );
}

export default Settings;
