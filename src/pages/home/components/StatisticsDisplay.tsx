import type CalculatorService from "services/CalculatorService";

interface StatisticsDisplayProps {
  calculatorService: CalculatorService;
}

function StatisticsDisplay({ calculatorService }: StatisticsDisplayProps) {
  return (
    <div className="flex w-full lg:w-1/3 bg-shadow border-1 border-solid rounded-md">
      <div className="w-full p-2">
        <h2>Féléves adatok</h2>
        {calculatorService.config["semesterStatistics"].map((item) => {
          return (
            item.enabled && (
              <div key={item.key}>
                {item.text}: <b>{item.method()}</b>
              </div>
            )
          );
        })}
        <h2>Összesített adatok</h2>
        {calculatorService.config["cumulatedStatistics"].map((item) => {
          return (
            item.enabled && (
              <div key={item.key}>
                {item.text}: <b>{item.method()}</b>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default StatisticsDisplay;
