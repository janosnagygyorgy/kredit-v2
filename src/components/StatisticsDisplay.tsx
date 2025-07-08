import type CalculatorService from "../services/CalculatorService";

interface StatisticsDisplayProps {
  calculatorService: CalculatorService;
}

function StatisticsDisplay({ calculatorService }: StatisticsDisplayProps) {
  return (
    <>
      <h2>Féléves adatok</h2>
      <div>
        {`Hagyományos átlag: ${
          Math.round(calculatorService.semesterTraditionalAverage() * 100) / 100
        }`}
      </div>
      <div>
        {`Súlyozott átlag: ${
          Math.round(calculatorService.semesterWeightedAverage() * 100) / 100
        }`}
      </div>
      <div>{`Felvett kredit: ${calculatorService.semesterCreditSum()}`}</div>
      <div>
        {`Teljesített kredit: ${calculatorService.semesterCompletedCreditSum()}`}
      </div>
      <div>
        {`Kreditindex: ${
          Math.round(calculatorService.semesterCreditIndex() * 100) / 100
        }`}
      </div>
      <div>
        {`Korrigált kreditindex: ${
          Math.round(calculatorService.semesterCorrectedCreditIndex() * 100) /
          100
        }`}
      </div>

      <h2>Összesített adatok</h2>
      <div>
        {`Összesített hagyományos átlag: ${
          Math.round(calculatorService.cumulatedTraditionalAverage() * 100) /
          100
        }`}
      </div>
      <div>
        {`Összesített súlyozott átlag: ${
          Math.round(calculatorService.cumulatedWeightedAverage() * 100) / 100
        }`}
      </div>
      <div>
        {`Összes teljesített kredit: ${calculatorService.cumulatedCompletedCreditSum()}`}
      </div>
      <div>
        {`Összesített kreditindex: ${
          Math.round(calculatorService.cumulatedCreditIndex() * 100) / 100
        }`}
      </div>
      <div>
        {`Összesített korrigált kreditindex: ${
          Math.round(calculatorService.cumulatedCorrectedCreditIndex() * 100) /
          100
        }`}
      </div>
    </>
  );
}

export default StatisticsDisplay;
