import ImportExport from "../components/ImportExport";
import type { CalculatorServiceConfig } from "../interfaces/CalculatorServiceConfig";
import type { StoredData } from "../interfaces/StoredData";

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
      <div>
        <input
          type="checkbox"
          checked={config["semesterTraditionalAverage"]}
          onChange={() => toggleSetting("semesterTraditionalAverage")}
        />
        Hagyományos átlag
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["semesterWeightedAverage"]}
          onChange={() => toggleSetting("semesterWeightedAverage")}
        />
        Súlyozott átlag
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["semesterCreditSum"]}
          onChange={() => toggleSetting("semesterCreditSum")}
        />
        Felvett kredit
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["semesterCompletedCreditSum"]}
          onChange={() => toggleSetting("semesterCompletedCreditSum")}
        />
        Teljesített kredit
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["semesterCreditIndex"]}
          onChange={() => toggleSetting("semesterCreditIndex")}
        />
        Kreditindex
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["semesterCorrectedCreditIndex"]}
          onChange={() => toggleSetting("semesterCorrectedCreditIndex")}
        />
        Korrigált kreditindex
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["cumulatedTraditionalAverage"]}
          onChange={() => toggleSetting("cumulatedTraditionalAverage")}
        />
        Összesített hagyományos átlag
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["cumulatedWeightedAverage"]}
          onChange={() => toggleSetting("cumulatedWeightedAverage")}
        />
        Összesített súlyozott átlag
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["cumulatedCompletedCreditSum"]}
          onChange={() => toggleSetting("cumulatedCompletedCreditSum")}
        />
        Összes teljesített kredit
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["cumulatedCreditIndex"]}
          onChange={() => toggleSetting("cumulatedCreditIndex")}
        />
        Összesített kreditindex
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["cumulatedCorrectedCreditIndex"]}
          onChange={() => toggleSetting("cumulatedCorrectedCreditIndex")}
        />
        Összesített korrigált kreditindex
      </div>

      <ImportExport data={data} onImport={onImport} />
    </>
  );
}

export default Settings;
