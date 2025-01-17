import { ReactNode } from "react";

export interface Expense {
  id: number;
  title: string;
  month: string;
  plannedAmount: number;
  actualAmount: number;
}

export interface AddExpenseProps {
  onAddExpense: (expense: Expense) => void;
}

export interface ExpensesTableProps {
  expenses: Expense[];
  onUpdatedExpense: (updatedExpense: Expense) => void;
  onDeleteExpense: (expense: Expense) => void;
  selectedMonth: string;
}

export interface EditExpensesProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense;
  onUpdatedExpense: (updatedExpense: Expense) => void;
}

export interface DeleteExpensesProps {
  isOpenDelete: boolean;
  onCloseDelete: () => void;
  expense: Expense;
  onDeleteExpense: (expense: Expense) => void;
}

export interface ExpensesChartProps {
  expenses: Expense[];
}

export interface Income {
  id: number;
  source: string;
  month: string;
  amount: number;
}

export interface AddIncomeProps {
  onAddIncome: (income: {
    id: number;
    source: string;
    month: string;
    amount: number;
  }) => void;
}

export interface IncomeTableProps {
  income: Income[];
  selectedMonth: string;
  onUpdatedIncome: (updatedIncome: Income) => void;
  onDeleteIncome: (income: Income) => void;
}

export interface EditIncomeProps {
  isOpen: boolean;
  onClose: () => void;
  income: Income;
  onUpdatedIncome: (updatedIncome: Income) => void;
}

export interface DeleteIncomeProps {
  isOpenDeleteIncome: boolean;
  onCloseDeleteIncome: () => void;
  income: Income;
  onDeleteIncome: (income: Income) => void;
}

export interface IncomeChartProps {
  income: Income[];
  expenses?: Expense[];
}

export interface MonthContextProps {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export interface MonthProviderProps {
  children: ReactNode;
}

export interface MonthContextProps {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export interface IncomeExpensesTableProps {
  income: Income[];
  expenses: Expense[];
}
