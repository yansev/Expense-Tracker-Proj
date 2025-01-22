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

export interface BalanceTableProps {
  income: Income[];
  expenses: Expense[];
  bills: Bill[];
  savings: Savings[];
}

export interface Bill {
  id: number;
  billTitle: string;
  dueDate: string;
  paid: boolean;
  plannedAmount: number;
  actualAmount: number;
}

export interface AddBillsProps {
  onAddBill: (bill: Bill) => void;
}

export interface EditBillsProps {
  isOpen: boolean;
  onClose: () => void;
  bill: Bill;
  onUpdatedBill: (updatedBill: Bill) => void;
}

export interface DeleteBillsProps {
  isOpenDeleteBill: boolean;
  onCloseDeleteBill: () => void;
  bill: Bill;
  onDeleteBill: (bill: Bill) => void;
}

export interface BillsTableProps {
  bills: Bill[];
  onUpdatedBill: (updatedBill: Bill) => void;
  onDeleteBill: (bill: Bill) => void;
  selectedMonth: string;
}

export interface Savings {
  id: number;
  month: string;
  amount: number;
  savingsPercentage: number;
  income: Income[];
  expenses: Expense[];
}

export interface SavingsTableProps {
  income: Income[];
  savings: Savings[];
  onTotalSavingsChange: (totalSavings: number) => void;
}

export interface MonthlyData {
  month: string;
  savings: number;
  income: number;
  expenses: number;
  bills: number;
}

export interface BalanceProps {
  totalIncome: number;
  totalExpenses: number;
  totalBills: number;
  totalSavings: number;
  // onSavingsChange: (percentage: number) => void;
}

export interface SchedulerProps {
  bills: Bill[];
}

export interface SavingsContextProps {
  savingsPercentage: number;
  setSavingsPercentage: (percentage: number) => void;
}

export interface SummaryData {
  income: number;
  expenses: number;
  bills: number;
  savings: number;
}

export interface SummaryProps {
  income: number;
  expenses: number;
  bills: number;
  savings: number;
}
