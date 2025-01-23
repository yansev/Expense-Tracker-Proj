import { Expense } from "../../../../entities/model";

export const useFilterExpenses = (
  expenses: Expense[],
  selectedMonth: string
) => {
  return selectedMonth === "All" || !selectedMonth
    ? expenses
    : expenses.filter((expense) => expense.month === selectedMonth);
};
