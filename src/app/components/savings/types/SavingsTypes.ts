import { Income } from "../../income/types/IncomeTypes";
import { Expense } from "../../expenses/types/ExpensesTypes";

export type Savings = {
  id: number;
  month: string;
  amount: number;
  savingsPercentage: number;
  income: Income[];
  expenses: Expense[];
};

export type SavingsTableProps = {
  income: Income[];
  savings: Savings[];
  onTotalSavingsChange: (totalSavings: number) => void;
};

export type SavingsContextProps = {
  savingsPercentage: number;
  setSavingsPercentage: (percentage: number) => void;
};
