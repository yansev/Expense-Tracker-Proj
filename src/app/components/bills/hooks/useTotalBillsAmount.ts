import { Bill } from "../types/BillTypes";

export const useTotalBillsAmount = (filteredBills: Bill[]) => {
  const totalPlannedBills = filteredBills.reduce(
    (sum, bill) => sum + bill.plannedAmount,
    0
  );
  const totalActualBills = filteredBills.reduce(
    (sum, bill) => sum + bill.actualAmount,
    0
  );
  return { totalPlannedBills, totalActualBills };
};
