import type { StoredConfig } from "interfaces/StoredConfig";

interface CalculationSettingsProps {
  config: StoredConfig;
  toggleSetting: (setting: string) => void;
}

function CalculationSettings({
  config,
  toggleSetting,
}: CalculationSettingsProps) {
  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={config["semesterTraditionalAverage"]}
          onChange={() => toggleSetting("semesterTraditionalAverage")}
          id="semesterTraditionalAverage"
        />
        <label htmlFor="semesterTraditionalAverage" className="select-none">
          Hagyományos átlag
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["semesterWeightedAverage"]}
          onChange={() => toggleSetting("semesterWeightedAverage")}
          id="semesterWeightedAverage"
        />
        <label htmlFor="semesterWeightedAverage" className="select-none">
          Súlyozott átlag
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["semesterCreditSum"]}
          onChange={() => toggleSetting("semesterCreditSum")}
          id="semesterCreditSum"
        />
        <label htmlFor="semesterCreditSum" className="select-none">
          Felvett kredit
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["semesterCompletedCreditSum"]}
          onChange={() => toggleSetting("semesterCompletedCreditSum")}
          id="semesterCompletedCreditSum"
        />
        <label htmlFor="semesterCompletedCreditSum" className="select-none">
          Teljesített kredit
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["semesterCreditIndex"]}
          onChange={() => toggleSetting("semesterCreditIndex")}
          id="semesterCreditIndex"
        />
        <label htmlFor="semesterCreditIndex" className="select-none">
          Kreditindex
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["semesterCorrectedCreditIndex"]}
          onChange={() => toggleSetting("semesterCorrectedCreditIndex")}
          id="semesterCorrectedCreditIndex"
        />
        <label htmlFor="semesterCorrectedCreditIndex" className="select-none">
          Korrigált kreditindex
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["cumulatedTraditionalAverage"]}
          onChange={() => toggleSetting("cumulatedTraditionalAverage")}
          id="cumulatedTraditionalAverage"
        />
        <label htmlFor="cumulatedTraditionalAverage" className="select-none">
          Összesített hagyományos átlag
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["cumulatedWeightedAverage"]}
          onChange={() => toggleSetting("cumulatedWeightedAverage")}
          id="cumulatedWeightedAverage"
        />
        <label htmlFor="cumulatedWeightedAverage" className="select-none">
          Összesített súlyozott átlag
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["cumulatedCompletedCreditSum"]}
          onChange={() => toggleSetting("cumulatedCompletedCreditSum")}
          id="cumulatedCompletedCreditSum"
        />
        <label htmlFor="cumulatedCompletedCreditSum" className="select-none">
          Összes teljesített kredit
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["cumulatedCreditIndex"]}
          onChange={() => toggleSetting("cumulatedCreditIndex")}
          id="cumulatedCreditIndex"
        />
        <label htmlFor="cumulatedCreditIndex" className="select-none">
          Összesített kreditindex
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={config["cumulatedCorrectedCreditIndex"]}
          onChange={() => toggleSetting("cumulatedCorrectedCreditIndex")}
          id="cumulatedCorrectedCreditIndex"
        />
        <label htmlFor="cumulatedCorrectedCreditIndex" className="select-none">
          Összesített korrigált kreditindex
        </label>
      </div>
    </>
  );
}

export default CalculationSettings;
