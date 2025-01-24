export const useCalculateBalance = (
  totalIncome: number,
  totalExpenses: number,
  totalBills: number,
  totalSavings: number
) => {
  const remainingBalance =
    totalIncome - totalExpenses - totalBills - totalSavings;
  return { remainingBalance };
};
