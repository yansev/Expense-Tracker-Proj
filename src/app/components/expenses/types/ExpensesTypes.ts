export type Expense = {
  id: number;
  title: string;
  month: string;
  plannedAmount: number;
  actualAmount: number;
};

export type AddExpenseProps = {
  onAddExpense: (expense: Expense) => void;
};

export type ExpensesTableProps = {
  expenses: Expense[];
  onUpdatedExpense: (updatedExpense: Expense) => void;
  onDeleteExpense: (expense: Expense) => void;
  selectedMonth: string;
};

export type EditExpensesProps = {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense;
  onUpdatedExpense: (updatedExpense: Expense) => void;
};

export type DeleteExpensesProps = {
  isOpenDelete: boolean;
  onCloseDelete: () => void;
  expense: Expense;
  onDeleteExpense: (expense: Expense) => void;
};

export type ExpensesChartProps = {
  expenses: Expense[];
};
