import { MonthlyData } from "../../../../entities/model";

export const useTotalSavings = (incomeByMonth: MonthlyData[]) => {
  const totalSavings = incomeByMonth.reduce(
    (sum, item) => sum + item.savings,
    0
  );
  return { totalSavings };
};
