import { Income } from "../types/IncomeTypes";

export const useTotalIncome = (income: Income[]) => {
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  return { totalIncome };
};
