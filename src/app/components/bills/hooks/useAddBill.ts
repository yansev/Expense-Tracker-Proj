import { useState } from "react";
import { Bill } from "../types/BillTypes";
import { useToast } from "@chakra-ui/react";

export const useAddBill = (onAddBill: (bill: Bill) => void) => {
  const [billTitle, setBillTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [plannedAmount, setPlannedAmount] = useState<number>(0);
  const [actualAmount, setActualAmount] = useState<number>(0);
  const toast = useToast();

  const resetForm = () => {
    setBillTitle("");
    setDueDate("");
    setPlannedAmount(0);
    setActualAmount(0);
  };

  const handleSubmit = (e: React.FormEvent, onClose: () => void) => {
    e.preventDefault();
    const newBill = {
      id: Date.now(),
      billTitle,
      plannedAmount: plannedAmount || 0,
      actualAmount: actualAmount || 0,
      dueDate,
      paid: false,
    };
    onAddBill(newBill);
    toast({
      title: "Bill Added Successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    resetForm();
    onClose();
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
    resetForm,
  };
};
