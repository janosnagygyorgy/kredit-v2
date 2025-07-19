import type CalculatorService from "../../../services/CalculatorService";

interface StatisticsDisplayProps {
  calculatorService: CalculatorService;
}

function StatisticsDisplay({ calculatorService }: StatisticsDisplayProps) {
  return (
    <>
      <h2>Féléves adatok</h2>
      <div>
        {calculatorService.config.semesterTraditionalAverage &&
          `Hagyományos átlag: ${
            Math.round(calculatorService.semesterTraditionalAverage() * 100) /
            100
          }`}
      </div>
      <div>
        {calculatorService.config.semesterWeightedAverage &&
          `Súlyozott átlag: ${
            Math.round(calculatorService.semesterWeightedAverage() * 100) / 100
          }`}
      </div>
      <div>
        {calculatorService.config.semesterCreditSum &&
          `Felvett kredit: ${calculatorService.semesterCreditSum()}`}
      </div>
      <div>
        {calculatorService.config.semesterCompletedCreditSum &&
          `Teljesített kredit: ${calculatorService.semesterCompletedCreditSum()}`}
      </div>
      <div>
        {calculatorService.config.semesterCreditIndex &&
          `Kreditindex: ${
            Math.round(calculatorService.semesterCreditIndex() * 100) / 100
          }`}
      </div>
      <div>
        {calculatorService.config.semesterCorrectedCreditIndex &&
          `Korrigált kreditindex: ${
            Math.round(calculatorService.semesterCorrectedCreditIndex() * 100) /
            100
          }`}
      </div>

      <h2>Összesített adatok</h2>
      <div>
        {calculatorService.config.cumulatedTraditionalAverage &&
          `Összesített hagyományos átlag: ${
            Math.round(calculatorService.cumulatedTraditionalAverage() * 100) /
            100
          }`}
      </div>
      <div>
        {calculatorService.config.cumulatedWeightedAverage &&
          `Összesített súlyozott átlag: ${
            Math.round(calculatorService.cumulatedWeightedAverage() * 100) / 100
          }`}
      </div>
      <div>
        {calculatorService.config.cumulatedCompletedCreditSum &&
          `Összes teljesített kredit: ${calculatorService.cumulatedCompletedCreditSum()}`}
      </div>
      <div>
        {calculatorService.config.cumulatedCreditIndex &&
          `Összesített kreditindex: ${
            Math.round(calculatorService.cumulatedCreditIndex() * 100) / 100
          }`}
      </div>
      <div>
        {calculatorService.config.cumulatedCorrectedCreditIndex &&
          `Összesített korrigált kreditindex: ${
            Math.round(
              calculatorService.cumulatedCorrectedCreditIndex() * 100
            ) / 100
          }`}
      </div>
    </>
  );
}

export default StatisticsDisplay;
