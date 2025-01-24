import { Income } from "../types/IncomeTypes";

export const useFilteredIncome = (income: Income[], selectedMonth: string) => {
  const formatDateToMonthName = (monthString: string) => monthString;
  const filteredIncome =
    selectedMonth === "All" || !selectedMonth
      ? income
      : income.filter((incomeItem) => {
          const formattedMonth = formatDateToMonthName(incomeItem.month);
          return formattedMonth === selectedMonth;
        });
  return filteredIncome;
};
