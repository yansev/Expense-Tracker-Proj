import { Expense } from "../../expenses/types/ExpensesTypes";

export type Income = {
  id: number;
  source: string;
  month: string;
  amount: number;
};

export type AddIncomeProps = {
  onAddIncome: (income: {
    id: number;
    source: string;
    month: string;
    amount: number;
  }) => void;
};

export type IncomeTableProps = {
  income: Income[];
  selectedMonth: string;
  onUpdatedIncome: (updatedIncome: Income) => void;
  onDeleteIncome: (income: Income) => void;
};

export type EditIncomeProps = {
  isOpen: boolean;
  onClose: () => void;
  income: Income;
  onUpdatedIncome: (updatedIncome: Income) => void;
};

export type DeleteIncomeProps = {
  isOpenDeleteIncome: boolean;
  onCloseDeleteIncome: () => void;
  income: Income;
  onDeleteIncome: (income: Income) => void;
};

export type IncomeChartProps = {
  income: Income[];
  expenses?: Expense[];
};
