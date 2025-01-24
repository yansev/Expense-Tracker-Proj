import { useState, useEffect } from "react";
import { Income } from "../../income/types/IncomeTypes";
import { MonthlyData } from "../../../shared/types/types";

export const useSavings = (
  income: Income[],
  onTotalSavingsChange: (totalSavings: number) => void
) => {
  const [incomeByMonth, setIncomeByMonth] = useState<MonthlyData[]>([]);

  const formatDateToMonthName = (monthString: string) => monthString;

  useEffect(() => {
    const savingsPercentage = 20;
    const monthMap: { [key: string]: MonthlyData } = {};

    (income || []).forEach((data) => {
      const monthName = formatDateToMonthName(data.month);
      if (!monthMap[monthName]) {
        monthMap[monthName] = {
          month: monthName,
          income: 0,
          savings: 0,
          expenses: 0,
          bills: 0,
        };
      }
      monthMap[monthName].income += data.amount;
      monthMap[monthName].savings += (data.amount * savingsPercentage) / 100;
    });

    const updatedIncomeByMonth = Object.values(monthMap).sort((a, b) =>
      a.month.localeCompare(b.month)
    );

    setIncomeByMonth(updatedIncomeByMonth);

    const totalSavings = updatedIncomeByMonth.reduce(
      (sum, item) => sum + item.savings,
      0
    );
    onTotalSavingsChange(totalSavings);
  }, [income, onTotalSavingsChange]);

  return {
    incomeByMonth,
  };
};
