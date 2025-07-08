import type CalculatorService from "../services/CalculatorService";

interface StatisticsDisplayProps {
  calculatorService: CalculatorService;
}

function StatisticsDisplay({ calculatorService }: StatisticsDisplayProps) {
  return (
    <>
      <h2>Féléves adatok</h2>
      <div>
        Hagyományos átlag:
        {Math.round(calculatorService.semesterTraditionalAverage() * 100) / 100}
      </div>
      <div>
        Súlyozott átlag:
        {Math.round(calculatorService.semesterWeightedAverage() * 100) / 100}
      </div>
      <div>Felvett kredit: {calculatorService.semesterCreditSum()}</div>
      <div>
        Teljesített kredit: {calculatorService.semesterCompletedCreditSum()}
      </div>
      <div>
        Kreditindex:{" "}
        {Math.round(calculatorService.semesterCreditIndex() * 100) / 100}
      </div>
      <div>
        Korrigált kreditindex:
        {Math.round(calculatorService.semesterCorrectedCreditIndex() * 100) /
          100}
      </div>

      <h2>Összesített adatok</h2>
    </>
  );
}

export default StatisticsDisplay;
