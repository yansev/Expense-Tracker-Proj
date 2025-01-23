import { Expense } from "../../../../entities/model";

export const useTotalAmount = (filteredExpenses: Expense[]) => {
  const totalPlannedAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.plannedAmount,
    0
  );
  const totalActualAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.actualAmount,
    0
  );
  return { totalPlannedAmount, totalActualAmount };
};
