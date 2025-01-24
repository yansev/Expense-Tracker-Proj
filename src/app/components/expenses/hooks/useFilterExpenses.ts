import { Expense } from "../types/ExpensesTypes";
export const useFilterExpenses = (
  expenses: Expense[],
  selectedMonth: string
) => {
  return selectedMonth === "All" || !selectedMonth
    ? expenses
    : expenses.filter((expense) => expense.month === selectedMonth);
};
