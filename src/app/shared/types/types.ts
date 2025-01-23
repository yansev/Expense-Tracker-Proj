import { ReactNode } from "react";
import { Bill } from "../../components/bills/types/BillTypes";
import { Expense } from "../../components/expenses/types/ExpensesTypes";
import { Income } from "../../components/income/types/IncomeTypes";
import { Savings } from "../../components/savings/types/SavingsTypes";

export type MonthProviderProps = {
  children: ReactNode;
};

export type MonthContextProps = {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
};

export type MonthSelectorProps = {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
};

export type BalanceTableProps = {
  income: Income[];
  expenses: Expense[];
  bills: Bill[];
  savings: Savings[];
};

export type MonthlyData = {
  month: string;
  savings: number;
  income: number;
  expenses: number;
  bills: number;
};

export type BalanceProps = {
  totalIncome: number;
  totalExpenses: number;
  totalBills: number;
  totalSavings: number;
};
