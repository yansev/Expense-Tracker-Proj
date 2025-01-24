import { Bill } from "../types/BillTypes";

export const useBillStatusChange = (onUpdatedBill: (bill: Bill) => void) => {
  const updatedBill = (bill: Bill) => {
    const updatedBillData = { ...bill, paid: !bill.paid };
    onUpdatedBill(updatedBillData);
  };
  return { updatedBill };
};
