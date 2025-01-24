export type Bill = {
  id: number;
  billTitle: string;
  dueDate: string;
  paid: boolean;
  plannedAmount: number;
  actualAmount: number;
};

export type AddBillsProps = {
  onAddBill: (bill: Bill) => void;
};

export type EditBillsProps = {
  isOpen: boolean;
  onClose: () => void;
  bill: Bill;
  onUpdatedBill: (updatedBill: Bill) => void;
};

export type DeleteBillsProps = {
  isOpenDeleteBill: boolean;
  onCloseDeleteBill: () => void;
  bill: Bill;
  onDeleteBill: (bill: Bill) => void;
};

export type BillsTableProps = {
  bills: Bill[];
  onUpdatedBill: (updatedBill: Bill) => void;
  onDeleteBill: (bill: Bill) => void;
  selectedMonth: string;
};

export type RemindersProps = {
  id: number;
  status: string;
  billName: string;
  dueDate: string;
};
