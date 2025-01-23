export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface SavingsGoal {
  id: string;
  goal: string;
  targetAmount: number;
  savedAmount: number;
}

export interface SavingsChallenge {
  id: string;
  name: string;
  targetAmount: number;
  progress: number;
}

export interface SummaryData {
  income: number;
  expenses: number;
  bills: number;
  savings: number;
}

export interface PlannedAmount {
  id: string;
  name: string;
  amount: number;
}

export interface ActualAmount {
  id: string;
  name: string;
  amount: number;
}
