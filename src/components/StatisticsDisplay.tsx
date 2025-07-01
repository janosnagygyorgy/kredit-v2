import type CalculatorService from "../services/CalculatorService";

interface StatisticsDisplayProps {
  calculatorService: CalculatorService;
}

function StatisticsDisplay({ calculatorService }: StatisticsDisplayProps) {
  return (
    <>
      <div>Kreditek összege: {calculatorService.creditSum().toString()}</div>
    </>
  );
}

export default StatisticsDisplay;
