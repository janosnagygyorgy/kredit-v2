import type CalculatorService from "services/CalculatorService";

interface StatisticsDisplayProps {
  calculatorService: CalculatorService;
}

function StatisticsDisplay({ calculatorService }: StatisticsDisplayProps) {
  return (
    <>
      <h2>Féléves adatok</h2>
      {calculatorService.config["semesterStatistics"].map((item) => {
        return (
          item.enabled && (
            <div key={item.key}>
              {item.text}: {item.method()}
            </div>
          )
        );
      })}

      <h2>Összesített adatok</h2>
      {calculatorService.config["cumulatedStatistics"].map((item) => {
        return (
          item.enabled && (
            <div key={item.key}>
              {item.text}: {item.method()}
            </div>
          )
        );
      })}
    </>
  );
}

export default StatisticsDisplay;
