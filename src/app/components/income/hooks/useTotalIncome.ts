import { Income } from "../../../../entities/model";

export const useTotalIncome = (income: Income[]) => {
  const totalIncome = income.reduce(
    (total, income) => total + (income.amount || 0),
    0
  );
  return totalIncome;
};
