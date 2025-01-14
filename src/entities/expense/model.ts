export interface Expense {
  id: number;
  title: string;
  month: string;
  plannedAmount: number;
  actualAmount: number;
}

export interface AddExpenseProps {
  onAddExpense: (expense: {
    id: number;
    title: string;
    month: string;
    plannedAmount: number;
    actualAmount: number;
  }) => void;
}

export interface ExpensesTableProps {
  expenses: Expense[];
  onUpdatedExpense: (updatedExpense: Expense) => void;
}

export interface EditExpensesProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense;
  onUpdatedExpense: (updatedExpense: Expense) => void;
}
