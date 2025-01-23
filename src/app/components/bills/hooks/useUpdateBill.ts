import { useToast } from "@chakra-ui/react/toast";
import { Bill } from "../../../../entities/model";
import { useEffect, useState } from "react";

export const useUpdateBill = (
  bill: Bill,
  onUpdatedBill: (bill: Bill) => void
) => {
  const [billTitle, setBillTitle] = useState(bill.billTitle);
  const [dueDate, setDueDate] = useState(bill.dueDate);
  const [plannedAmount, setPlannedAmount] = useState<number>(
    bill.plannedAmount
  );
  const [actualAmount, setActualAmount] = useState<number>(bill.actualAmount);
  useEffect(() => {
    if (bill) {
      setBillTitle(bill.billTitle);
      setDueDate(bill.dueDate);
      setPlannedAmount(bill.plannedAmount);
      setActualAmount(bill.actualAmount);
    }
  }, [bill]);

  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBill = {
      ...bill,
      billTitle,
      dueDate,
      plannedAmount,
      actualAmount,
    };
    toast({
      title: "Data UpdatedSuccessfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onUpdatedBill(updatedBill);
  };

  return {
    billTitle,
    setBillTitle,
    dueDate,
    setDueDate,
    plannedAmount,
    setPlannedAmount,
    actualAmount,
    setActualAmount,
    handleSubmit,
  };
};
