import { Bill } from "../types/BillTypes";

export const useFilteredBills = (bills: Bill[], selectedMonth: string) => {
  return selectedMonth === "All" || !selectedMonth
    ? bills
    : bills.filter((bill) => {
        const billMonth = new Date(bill.dueDate)
          .toLocaleString("default", { month: "long" })
          .toLowerCase();
        return billMonth === selectedMonth;
      });
};
