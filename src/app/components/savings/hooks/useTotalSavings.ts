import { Income } from "../../income/types/IncomeTypes";

export const useTotalSavings = (income: Income[]) => {
  const totalSavings = income.reduce((sum, item) => sum + item.amount * 0.2, 0);
  return { totalSavings };
};
