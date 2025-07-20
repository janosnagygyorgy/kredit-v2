import type CalculatorService from "services/CalculatorService";

interface CalculationSettingsProps {
  calculatorService: CalculatorService;
  toggleSetting: (setting: string) => void;
}

function CalculationSettings({
  calculatorService,
  toggleSetting,
}: CalculationSettingsProps) {
  return (
    <>
      <h2>Féléves adatok</h2>
      {calculatorService.config["semesterStatistics"].map((item) => {
        return (
          <div key={item.key}>
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={() => toggleSetting(item.key)}
              id={item.key}
            />
            <label htmlFor={item.key} className="select-none">
              {item.text}
            </label>
          </div>
        );
      })}

      <h2>Összesített adatok</h2>
      {calculatorService.config["cumulatedStatistics"].map((item) => {
        return (
          <div key={item.key}>
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={() => toggleSetting(item.key)}
              id={item.key}
            />
            <label htmlFor={item.key} className="select-none">
              {item.text}
            </label>
          </div>
        );
      })}
    </>
  );
}

export default CalculationSettings;
