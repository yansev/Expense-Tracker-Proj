import { Expense } from "../types/ExpensesTypes";

export const useTotalAmount = (filteredExpenses: Expense[]) => {
  const totalPlannedAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.plannedAmount,
    0
  );
  const totalExpActualAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.actualAmount,
    0
  );
  return { totalPlannedAmount, totalExpActualAmount };
};
